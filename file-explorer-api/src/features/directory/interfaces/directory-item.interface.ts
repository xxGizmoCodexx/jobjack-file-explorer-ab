export interface DirectoryItem {
  name: string;
  path: string;
  size: number;
  sizeFormatted: string;
  extension: string;
  fileType: string;
  createdDate: string | null;
  modifiedDate: string | null;
  permissions: {
    readable: boolean;
    writable: boolean;
    executable: boolean;
  };
  isDirectory: boolean;
  mode: string;
  error?: string;
}
