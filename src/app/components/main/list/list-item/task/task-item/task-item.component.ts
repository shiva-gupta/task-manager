import { ToastrService } from 'ngx-toastr';
import { TaskService } from './../../../../../../services/shared/task.service';
import { ListService } from './../../../../../../services/shared/list.service';
import { Status } from './../../../../../../models/status';
import { DeleteTaskItemDialogComponent } from './../delete-task-item-dialog/delete-task-item-dialog.component';
import { Task } from './../../../../../../models/task';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit, OnChanges {

  @Input() task: Task;
  display = true;

  statusList: Array<Status> = this.getStatusList();
  selectedStatus: string;

  constructor(
    private dialog: MatDialog,
    private listSetvice: ListService,
    private taskService: TaskService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedStatus = changes.task.currentValue.status;
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

  getStatusList(): Array<Status> {
    return this.listSetvice.findAll()
      .map(list => list.title)
      .map(title => {
        return new Status(title, title);
      });
  }

  onStatusChange(): void {
    this.taskService.changeStatus(this.task, this.selectedStatus);
    this.toastr.success('Status Changed');
  }

}
