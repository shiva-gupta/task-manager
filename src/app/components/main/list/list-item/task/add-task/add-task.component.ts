import { List } from 'src/app/models/list';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  @Input() list: List;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(
      AddTaskDialogComponent,
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
