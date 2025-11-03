import { Injectable } from '@nestjs/common';
import path from 'path';

@Injectable()
export class FileUtilService {
  public getFileExtension(filename: string): string {
    const ext = path.extname(filename).toLowerCase();
    return ext === '' ? 'no extension' : ext;
  }

  // Helper function to format file size
  public formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;

    return Math.round(bytes / k) + ' KB'; // Simplified to KB for brevity

    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  // Helper function to get permissions string
  public getPermissions = (mode: number, isDirectory: boolean) => {
    const isReadable = (mode & parseInt('444', 8)) !== 0;
    const isWritable = (mode & parseInt('222', 8)) !== 0;
    const isExecutable = (mode & parseInt('111', 8)) !== 0;

    return {
      readable: isReadable,
      writable: isWritable,
      executable: isExecutable || isDirectory,
    };
  };
}
