import { DeleteListItemDialogComponent } from './delete-list-item-dialog/delete-list-item-dialog.component';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { List } from 'src/app/models/list';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() list: List;

  constructor(
    private dialog: MatDialog
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

}
