import { UpdateListDialogComponent } from './update-list-dialog/update-list-dialog.component';
import { DeleteListItemDialogComponent } from './delete-list-item-dialog/delete-list-item-dialog.component';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { List } from 'src/app/models/list';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { CustomErrorStateMatcherService } from 'src/app/services/forms/custom-error-state-matcher.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() list: List;

  constructor(
    private dialog: MatDialog,
    public matcher: CustomErrorStateMatcherService
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(
      DeleteListItemDialogComponent,
      {
        height: 'fit-content',
        width: 'fit-content',
        data: {
          list: this.list
        }
      })
    .afterClosed().subscribe(
      (res: any) => {

      }
    );
  }

  openUpdateDialog(): void {
    this.dialog.open(
      UpdateListDialogComponent,
      {
        height: 'fit-content',
        width: 'fit-content',
        data: {
          list: this.list
        }
      });
  }

}
