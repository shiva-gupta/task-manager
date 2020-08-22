import { EventEmitterService } from './../../../../../services/shared/event-emitter.service';
import { List } from './../../../../../models/list';
import { ListService } from '../../../../../services/shared/list.service';
import { CustomErrorStateMatcherService } from './../../../../../services/forms/custom-error-state-matcher.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-list-dialog',
  templateUrl: './add-list-dialog.component.html',
  styleUrls: ['./add-list-dialog.component.scss']
})
export class AddListDialogComponent implements OnInit {

  list: List = new List();
  titleControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private dialogRef: MatDialogRef<AddListDialogComponent>,
    public matcher: CustomErrorStateMatcherService,
    private toastr: ToastrService,
    private listService: ListService,
    private eventEmitter: EventEmitterService
  ) { }

  ngOnInit(): void {
    this.titleControl.valueChanges.subscribe((title: string) => {
      this.list.title = title.trim();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  createList(): void {
    this.list = this.listService.save(this.list);

    if (this.list.id !== undefined) {
      this.toastr.success('New List Added');
      this.eventEmitter.emitListAdd(this.list);
      this.closeDialog();
    } else {
      this.toastr.error('Duplicate title');
    }
  }

}
