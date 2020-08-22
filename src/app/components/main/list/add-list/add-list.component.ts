import { AddListDialogComponent } from './add-list-dialog/add-list-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(
      AddListDialogComponent,
      {
        height: 'fit-content',
        width: 'fit-content'
      })
    .afterClosed().subscribe(
      (res: any) => {

      }
    );
  }

}
