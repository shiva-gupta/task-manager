import { CustomErrorStateMatcherService } from './../../../../../services/forms/custom-error-state-matcher.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-list-dialog',
  templateUrl: './add-list-dialog.component.html',
  styleUrls: ['./add-list-dialog.component.scss']
})
export class AddListDialogComponent implements OnInit {

  name = '';
  nameControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private dialogRef: MatDialogRef<AddListDialogComponent>,
    public matcher: CustomErrorStateMatcherService
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  createList(): void {

  }

}
