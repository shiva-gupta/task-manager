import { List } from './../../models/list';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  listAdd: EventEmitter<List> = new EventEmitter();
  listDelete: EventEmitter<List> = new EventEmitter();
  listUpdate: EventEmitter<List> = new EventEmitter();

  taskAdd: EventEmitter<List> = new EventEmitter();
  taskDelete: EventEmitter<List> = new EventEmitter();
  taskUpdate: EventEmitter<List> = new EventEmitter();

  toggleTheme: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  emitListAdd(list: List): void {
    this.listAdd.emit(list);
  }
  emitListDelete(list: List): void {
    this.listDelete.emit(list);
  }
  emitListUpdate(list: List): void {
    this.listUpdate.emit(list);
  }

  emitTaskAdd(list: List): void {
    this.taskAdd.emit(list);
  }
  emitTaskDelete(list: List): void {
    this.taskAdd.emit(list);
  }
  emitTaskUpdate(list: List): void {
    this.taskUpdate.emit(list);
  }

  emitToggleTheme(isDark: boolean): void {
    this.toggleTheme.emit(isDark);
  }
}
