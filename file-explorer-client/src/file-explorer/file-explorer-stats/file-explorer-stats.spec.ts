import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExplorerStats } from './file-explorer-stats';

describe('FileExplorerStats', () => {
  let component: FileExplorerStats;
  let fixture: ComponentFixture<FileExplorerStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileExplorerStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileExplorerStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
