import { Controller, Get, HttpException, Query } from '@nestjs/common';
import fs from 'node:fs/promises';
import { DirectoryService } from './directory.service';
import { DirectoryResponse } from './interfaces/directory-response.interface';

const BASE_PATH = 'directory';
@Controller()
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}

  @Get(`${BASE_PATH}/online`)
  online(): string {
    return 'online';
  }

  @Get(`${BASE_PATH}`)
  async getDirectoryListing(@Query('path') dirPath: string): Promise<DirectoryResponse> {
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

    return await this.directoryService.getDirectoryListing(dirPath);
  }
}
