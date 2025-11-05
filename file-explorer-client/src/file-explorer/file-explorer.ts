import { Component, inject, OnInit } from '@angular/core';
import { FileExplorerGrid } from './file-explorer-grid/file-explorer-grid';
import { FileExplorerStats } from './file-explorer-stats/file-explorer-stats';
import { FormsModule } from '@angular/forms';
import { FileExplorerService } from './file-explorer-service';
import { Observable, tap } from 'rxjs';
import { DirectoryResponse } from './interfaces/directory-response.interface';
import { CommonModule, AsyncPipe } from '@angular/common';
import { DirectoryItem } from './interfaces/directory-item.interface';

@Component({
  selector: 'file-explorer',
  imports: [CommonModule, FormsModule, FileExplorerGrid, FileExplorerStats, AsyncPipe],
  templateUrl: './file-explorer.html',
  styleUrl: './file-explorer.scss',
})
export class FileExplorer implements OnInit {
  private _fileExplorerService = inject(FileExplorerService);

  public contextPath = '';
  public directoryData$?: Observable<DirectoryResponse>;

  ngOnInit(): void {
    this.loadDirectory(this.contextPath);
  }

  public loadDirectory(path: string) {
    this.directoryData$ = this._fileExplorerService.loadDirectory$(path).pipe(
      tap((data) => {
        this.contextPath = data.path;
      })
    );
  }

  public updateDirectoryData(item: DirectoryItem) {
    if (!item.isDirectory) {
      return;
    }

    this.loadDirectory(item.path);
  }

  public navigateToParent(path: string) {
    this.loadDirectory(path);
  }
}
