import { EventEmitterService } from './../../../services/shared/event-emitter.service';
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
    private listService: ListService,
    private eventEmitter: EventEmitterService
  ) { }

  ngOnInit(): void {
    this.findAllList();

    this.subscribeEvents();
  }

  subscribeEvents(): void {
    this.eventEmitter.listAdd.subscribe((list: List) => {
      this.lists = [...this.lists, list];
    });

    this.eventEmitter.listDelete.subscribe((list: List) => {
      this.lists = this.lists.filter(l => l.id !== list.id);
    });
  }

  findAllList(): void {
    this.lists = this.listService.findAll();
  }
}
