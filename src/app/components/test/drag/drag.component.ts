import { ListService } from './../../../services/shared/list.service';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { List } from 'src/app/models/list';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss']
})
export class DragComponent implements OnInit {

  lists: Array<List>;

  constructor(
    private listService: ListService
  ) { }

  ngOnInit(): void {
    this.lists = this.listService.findAll();
  }

  drop(event: CdkDragDrop<string[]>): void {
    console.log(event.previousIndex);
    console.log(event.currentIndex);
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }

}
