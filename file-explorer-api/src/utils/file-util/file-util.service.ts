import { Injectable } from '@nestjs/common';
import path from 'path';

@Injectable()
export class FileUtilService {
  public getFileExtension(filename: string): string {
    const ext = path.extname(filename).toLowerCase();
    return ext === '' ? 'no extension' : ext;
  }
}
