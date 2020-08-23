import { TaskService } from './../../../../../../services/shared/task.service';
import { EventEmitterService } from './../../../../../../services/shared/event-emitter.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-task-item-dialog',
  templateUrl: './delete-task-item-dialog.component.html',
  styleUrls: ['./delete-task-item-dialog.component.scss']
})
export class DeleteTaskItemDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteTaskItemDialogComponent>,
    private toastr: ToastrService,
    private eventEmitter: EventEmitterService,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  delete(): void {
    console.log(this.data.task);
    this.data.list = this.taskService.deleteTask(this.data.task);
    this.eventEmitter.emitTaskDelete(this.data.list);
    this.toastr.success('Deleted Successfully');
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
