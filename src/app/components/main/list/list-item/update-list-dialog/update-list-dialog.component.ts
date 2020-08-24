import { EventEmitterService } from './../../../../../services/shared/event-emitter.service';
import { ListService } from './../../../../../services/shared/list.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomErrorStateMatcherService } from 'src/app/services/forms/custom-error-state-matcher.service';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-list-dialog',
  templateUrl: './update-list-dialog.component.html',
  styleUrls: ['./update-list-dialog.component.scss']
})
export class UpdateListDialogComponent implements OnInit {

  title: string;
  titleControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private dialogRef: MatDialogRef<UpdateListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matcher: CustomErrorStateMatcherService,
    private toastr: ToastrService,
    private listService: ListService,
    private eventEmitter: EventEmitterService
  ) { }

  ngOnInit(): void {
    this.subscribeFormInputs();
  }

  subscribeFormInputs(): void {
    this.titleControl.valueChanges.subscribe((title: string) => {
      this.title = title.trim();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  updateList(): void {
    this.data.list = this.listService.update(this.data.list, {title: this.title});
    this.eventEmitter.emitListUpdate(this.data.list);
    this.toastr.success('Updated Successfully');
    this.closeDialog();
  }

}
