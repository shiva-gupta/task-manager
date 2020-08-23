import { ToastrService } from 'ngx-toastr';
import { TaskService } from './../../../../../../services/shared/task.service';
import { ListService } from './../../../../../../services/shared/list.service';
import { Status } from './../../../../../../models/status';
import { DeleteTaskItemDialogComponent } from './../delete-task-item-dialog/delete-task-item-dialog.component';
import { Task } from './../../../../../../models/task';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { CustomErrorStateMatcherService } from 'src/app/services/forms/custom-error-state-matcher.service';

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

  ecd: Date;
  description: string;
  ecdControl = new FormControl('', [
    Validators.required
  ]);
  descriptionControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private dialog: MatDialog,
    private listSetvice: ListService,
    private taskService: TaskService,
    private toastr: ToastrService,
    public matcher: CustomErrorStateMatcherService
  ) { }

  ngOnInit(): void {
    this.ecd = this.task.ecd;
    this.description = this.task.description;
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
    // this.taskService.changeStatus(this.task, this.selectedStatus);
    // this.toastr.success('Status Changed');
  }

  dateFilter = (date: Date) => {
    return date > new Date();
  }

  cancelEdit(): void {
    this.display = !this.display;
    this.ecd = this.task.ecd;
    this.selectedStatus = this.task.status;
    this.description = this.task.description;
  }

  update(): void {
    if (this.description !== this.task.description
      || this.ecd !== this.task.ecd
      || this.selectedStatus !== this.task.status) {

      this.task.description = this.description;
      this.task.ecd = this.ecd;
      this.taskService.changeStatus(this.task, this.selectedStatus);
      this.toastr.success('Updated Successfully');
    }
    this.display = !this.display;
  }

}
