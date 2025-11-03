import { DirectoryItem } from './directory-item.interface';

export interface DirectoryResponse {
  path: string;
  parentPath: string;
  items: DirectoryItem[];
  totalCount: number;
  directoryCount: number;
  fileCount: number;
}
