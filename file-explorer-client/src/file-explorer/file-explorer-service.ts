import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DirectoryResponse } from './interfaces/directory-response.interface';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileExplorerService {
  private _http = inject(HttpClient);

  private _baseUrl = `${environment.apiUrl}/directory`;

  public loadDirectory$(path: string): Observable<DirectoryResponse> {
    return this._http.get<DirectoryResponse>(this._baseUrl, {
      params: { path: encodeURIComponent(path) },
    });

    // this.directoryData$.subscribe({
    //   next: (data) => {
    //     this.currentPath = data.path;
    //     this.isLoading = false;
    //   },
    //   error: (err) => {
    //     this.error = err.error?.message || 'Failed to load directory';
    //     this.isLoading = false;
    //   },
    // });
  }
}
