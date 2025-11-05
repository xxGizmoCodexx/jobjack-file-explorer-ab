import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'file-explorer-stats',
  imports: [],
  templateUrl: './file-explorer-stats.html',
  styleUrl: './file-explorer-stats.scss',
})
export class FileExplorerStats {

  public inputPath = input("");
  public directoryCount = input<number>(0);
  public fileCount = input<number>(0);
  public totalCount = input<number>(0);

}
