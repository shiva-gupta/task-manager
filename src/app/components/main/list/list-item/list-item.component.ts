import { ToastrService } from 'ngx-toastr';
import { ListService } from './../../../../services/shared/list.service';
import { Component, OnInit, Input } from '@angular/core';
import { List } from 'src/app/models/list';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() list: List;

  constructor(
    private listService: ListService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  deleteList(): void {
    if (this.listService.deleteById(this.list.id)) {
      this.toastr.success('Deleted Successfully');
    }
  }

}
