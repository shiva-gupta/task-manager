import { EventEmitterService } from './../../../../../services/shared/event-emitter.service';
import { ListService } from './../../../../../services/shared/list.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-list-item-dialog',
  templateUrl: './delete-list-item-dialog.component.html',
  styleUrls: ['./delete-list-item-dialog.component.scss']
})
export class DeleteListItemDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteListItemDialogComponent>,
    private toastr: ToastrService,
    private listService: ListService,
    private eventEmitter: EventEmitterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  deleteList(): void {
    if (this.listService.deleteById(this.data.list.id)) {
      this.eventEmitter.emitListDelete(this.data.list);
      this.toastr.success('Deleted Successfully');
      this.dialogRef.close();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
