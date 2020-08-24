import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateListDialogComponent } from './update-list-dialog.component';

describe('UpdateListDialogComponent', () => {
  let component: UpdateListDialogComponent;
  let fixture: ComponentFixture<UpdateListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
