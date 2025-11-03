import { Injectable } from '@nestjs/common';
import fs from 'node:fs/promises';
import path from 'path';
import { FileUtilService } from 'src/utils/file-util/file-util.service';

@Injectable()
export class DirectoryService {

  constructor(private fileUtilService: FileUtilService) {}

  public getHello(): string {
    return 'Hello !' + process.cwd();
  }

  public async getDirectoryListing(dirPath: string): Promise<string> {


  }
}
