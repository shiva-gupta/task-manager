import { TaskService } from './../../../../../../services/shared/task.service';
import { Task } from './../../../../../../models/task';
import { EventEmitterService } from './../../../../../../services/shared/event-emitter.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { CustomErrorStateMatcherService } from 'src/app/services/forms/custom-error-state-matcher.service';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent implements OnInit {

  task = new Task('', new Date(), new Date(), '', 1, '');
  titleControl = new FormControl('', [
    Validators.required
  ]);
  ecdControl = new FormControl('', [
    Validators.required
  ]);
  descriptionControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private toastr: ToastrService,
    private eventEmitter: EventEmitterService,
    private taskService: TaskService,
    public matcher: CustomErrorStateMatcherService,
    private dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.subscribeFormInputs();
  }

  subscribeFormInputs(): void {
    this.titleControl.valueChanges.subscribe((title: string) => {
      this.task.title = title.trim();
    });
    this.ecdControl.valueChanges.subscribe((ecd: Date) => {
      this.task.ecd = ecd;
    });
    this.descriptionControl.valueChanges.subscribe((description: string) => {
      this.task.description = description.trim();
    });
  }

  addTask(): void {
    this.data.list = this.taskService.save(this.data.list, this.task);
    this.toastr.success('Task Added Successfully');
    this.eventEmitter.emitTaskAdd(this.data.list);
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  dateFilter = (date: Date) => {
    return date > new Date();
  }

}
