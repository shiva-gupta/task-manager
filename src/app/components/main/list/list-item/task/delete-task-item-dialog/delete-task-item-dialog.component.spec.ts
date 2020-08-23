import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaskItemDialogComponent } from './delete-task-item-dialog.component';

describe('DeleteTaskItemDialogComponent', () => {
  let component: DeleteTaskItemDialogComponent;
  let fixture: ComponentFixture<DeleteTaskItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTaskItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTaskItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
