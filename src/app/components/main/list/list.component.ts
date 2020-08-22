import { ListService } from './../../../services/shared/list.service';
import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  lists: Array<List>;

  constructor(
    private listService: ListService
  ) { }

  ngOnInit(): void {
    this.findAllList();
  }

  findAllList(): void {
    this.lists = this.listService.findAll();
  }
}
