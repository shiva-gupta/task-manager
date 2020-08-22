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

  task = new Task('', new Date(), new Date(), '', 0);
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
    console.log(this.task);
    // if (this.listService.deleteById(this.data.list.id)) {
    //   this.eventEmitter.emitListDelete(this.data.list);
    //   this.toastr.success('Deleted Successfully');
    //   this.dialogRef.close();
    // }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
