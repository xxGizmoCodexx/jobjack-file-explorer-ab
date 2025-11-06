import { Injectable } from '@nestjs/common';
import path from 'path';

@Injectable()
export class FileUtilService {
  // Helper function to get file extension
  public getFileExtension(filename: string): string {
    const ext = path.extname(filename).toLowerCase();
    return ext === '' ? 'no extension' : ext;
  }

  // Helper function to format file size
  public formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;

    const kb = Math.round(bytes / k);

    return kb == 0 ? '1 KB' : kb + ' KB'; // Simplified to KB for brevity
  }

  // Helper function to get permissions string
  public getPermissions(mode: number, isDirectory: boolean) {
    const isReadable = (mode & parseInt('444', 8)) !== 0;
    const isWritable = (mode & parseInt('222', 8)) !== 0;
    const isExecutable = (mode & parseInt('111', 8)) !== 0;

    return {
      readable: isReadable,
      writable: isWritable,
      executable: isExecutable || isDirectory,
    };
  }
}
