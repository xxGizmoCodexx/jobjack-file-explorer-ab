import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileExplorer } from '../file-explorer/file-explorer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FileExplorer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('file-explorer-client');
}
