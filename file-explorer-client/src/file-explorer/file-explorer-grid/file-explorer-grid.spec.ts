import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExplorerGrid } from './file-explorer-grid';

describe('FileExplorerGrid', () => {
  let component: FileExplorerGrid;
  let fixture: ComponentFixture<FileExplorerGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileExplorerGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileExplorerGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
