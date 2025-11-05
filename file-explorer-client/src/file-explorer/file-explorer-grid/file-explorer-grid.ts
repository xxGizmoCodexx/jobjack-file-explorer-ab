import { Component, input, output } from '@angular/core';
import { DirectoryItem } from '../interfaces/directory-item.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'file-explorer-grid',
  imports: [DatePipe],
  templateUrl: './file-explorer-grid.html',
  styleUrl: './file-explorer-grid.scss',
})
export class FileExplorerGrid {
  public items = input<DirectoryItem[]>([]);

  public itemClicked = output<DirectoryItem>();

  updateDirectory(data: DirectoryItem) {
    this.itemClicked.emit(data);
  }
}
