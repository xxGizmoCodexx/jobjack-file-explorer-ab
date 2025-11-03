import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { DirectoryService } from './directory.service';
import { DirectoryResponse } from './interfaces/directory-response.interface';
import fs from 'node:fs/promises';

import path from 'path';

@Controller()
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}

  @Get('directory/online')
  online(): string {
    return this.directoryService.getHello();
  }

  @Get('directory')
  async getDirectoryListing(@Query('path') dirPath: string): Promise<Partial<DirectoryResponse>[]> {
    //Return current working directory info if no path is provided
    // if (!dirPath) {
    //   const cwd = process.cwd();
    //   return {
    //     path: cwd,
    //     parentPath: path.dirname(cwd),
    //     items: [],
    //     totalCount: 0,
    //     directoryCount: 0,
    //     fileCount: 0,
    //   };
    // }

    if (!dirPath) {
      dirPath = process.cwd();
    }

    //Error handling
    //Check if path exists
    try {
      await fs.lstat(dirPath);
    } catch {
      throw new HttpException('Path does not exist', 400);
    }

    // try {
    //   const stats = await fs.stat('/Users/joe/test.txt');
    //   stats.isFile(); // true
    //   stats.isDirectory(); // false
    //   stats.isSymbolicLink(); // false
    //   console.log(stats.size); // 1024000 //= 1MB
    // } catch (err) {
    //   console.log(err);
    // }

    return await this.directoryService.getDirectoryListing(dirPath);
  }
}
