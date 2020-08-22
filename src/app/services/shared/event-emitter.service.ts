import { List } from './../../models/list';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  listAdd: EventEmitter<List> = new EventEmitter();
  listDelete: EventEmitter<List> = new EventEmitter();

  taskAdd: EventEmitter<List> = new EventEmitter();

  constructor() { }

  emitListAdd(list: List): void {
    this.listAdd.emit(list);
  }

  emitListDelete(list: List): void {
    this.listDelete.emit(list);
  }

  emitTaskAdd(list: List): void {
    this.taskAdd.emit(list);
  }
}
