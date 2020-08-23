import { DeleteTaskItemDialogComponent } from './../delete-task-item-dialog/delete-task-item-dialog.component';
import { Task } from './../../../../../../models/task';
import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task;
  display = true;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  getCreated(): string {
    return new DatePipe('en-IN').transform(this.task.date, 'dd/MM/yyyy');
  }

  getEcd(): string {
    return new DatePipe('en-IN').transform(this.task.ecd, 'dd/MM/yyyy');
  }

  openDialog(): void {
    this.dialog.open(
      DeleteTaskItemDialogComponent,
      {
        height: 'fit-content',
        width: 'fit-content',
        data: {
          task: this.task
        }
      })
    .afterClosed().subscribe(
      (res: any) => {

      }
    );
  }

}
