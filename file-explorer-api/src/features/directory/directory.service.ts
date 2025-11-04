import { Injectable, Logger } from '@nestjs/common';
import { ReadStream } from 'node:fs';
import fs from 'node:fs/promises';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';

import { FileUtilService } from 'src/utils/file-util/file-util.service';
import { DirectoryItem } from './interfaces/directory-item.interface';
import { DirectoryResponse } from './interfaces/directory-response.interface';

@Injectable()
export class DirectoryService {
  private readonly _logger = new Logger(DirectoryService.name, { timestamp: true });

  constructor(private readonly _fileUtilService: FileUtilService) {}

  private async *listDirNames(dirPath): AsyncGenerator<string> {
    const dir = await fs.opendir(dirPath);
    try {
      for await (const dirent of dir) {
        yield dirent.name; // Stream file/directory names as soon as they are read
      }
    } catch (err) {
      this._logger.error(`Error reading directory ${dirPath}: ${err.message}`);
    }
  }

  private processFileName(basePath: string): Transform {
    const context = this;

    return new Transform({
      objectMode: true,
      async transform(file, encoding, callback) {
        const fullPath = path.join(basePath, file);

        try {
          const fileStats = await fs.lstat(fullPath);
          const extension = context._fileUtilService.getFileExtension(file);
          const permissions = context._fileUtilService.getPermissions(fileStats.mode, fileStats.isDirectory());

          callback(null, {
            name: file,
            path: fullPath,
            size: fileStats.size,
            sizeFormatted: context._fileUtilService.formatFileSize(fileStats.size),
            extension: extension,
            fileType: fileStats.isDirectory() ? 'directory' : 'file',
            createdDate: fileStats.birthtime.toISOString(),
            modifiedDate: fileStats.mtime.toISOString(),
            permissions: permissions,
            isDirectory: fileStats.isDirectory(),
            mode: fileStats.mode.toString(8),
          });
        } catch {
          callback(null, {
            name: file,
            path: fullPath,
            size: 0,
            sizeFormatted: '0 B',
            extension: context._fileUtilService.getFileExtension(file),
            fileType: 'unknown',
            createdDate: null,
            modifiedDate: null,
            permissions: { readable: false, writable: false, executable: false },
            isDirectory: false,
            error: 'Permission denied',
          });
        }
      },
    });
  }

  public async getDirectoryListing(dirPath: string): Promise<DirectoryResponse> {
    const startTime = performance.now();
    const results: DirectoryItem[] = [];

    // Read directory and process using streams
    // const files = await fs.readdir(dirPath);

    //Get the directory stream
    const readStream = ReadStream.from(this.listDirNames(dirPath));
    // const readStream = ReadStream.from(files);

    //Setup transform stream that converts file names to directory data objects
    const transformStream = this.processFileName(dirPath);

    transformStream.on('data', (data: DirectoryItem) => {
      this._logger.debug(data);
      results.push(data);
    });

    await pipeline(readStream, transformStream);

    // Calculate statistics using functional approach
    const [totalCount, directoryCount, fileCount] =
      results.length > 0
        ? [
            results.length,
            results.filter((item) => item.isDirectory && !item.error).length,
            results.filter((item) => !item.isDirectory).length,
          ]
        : [0, 0, 0];

    const response = {
      path: dirPath,
      parentPath: path.dirname(dirPath),
      items: results,
      totalCount,
      directoryCount,
      fileCount,
    };
    
    const endTime = performance.now();
    this._logger.log(`Directory listing for ${dirPath} completed in ${(endTime - startTime).toFixed(2)}ms`);
    
    return Promise.resolve(response);
  }
}
