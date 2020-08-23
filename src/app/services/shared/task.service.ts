import { EventEmitterService } from './event-emitter.service';
import { ListService } from './list.service';
import { Task } from './../../models/task';
import { List } from 'src/app/models/list';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../env/env.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private listService: ListService,
    private eventEmitter: EventEmitterService
  ) { }

  save(list: List, task: Task): List {
    task.status = list.title;

    const lists = this.listService.findAll();
    lists.forEach(l => {
      if (l.id === list.id) {
        if (l.tasks === null || l.tasks === undefined || l.tasks.length === 0) {
          l.tasks = [task];
        } else {
          task.order = l.tasks[l.tasks.length - 1].order + 1;
          l.tasks = [...l.tasks, task];
        }
        list = l;
      }
    });
    this.listService.saveLists(lists);
    return list;
  }

  deleteTask(task: Task): List {
    let resultList: List;

    const lists = this.listService.findAll();
    lists.forEach(l => {
      if (l.title === task.status) {
        l.tasks = l.tasks.filter(t => t.order !== task.order);
        resultList = l;
      }
    });
    this.listService.saveLists(lists);

    return resultList;
  }

  changeStatus(task: Task, newStatus: string): void {
    // delete task from current list
    this.eventEmitter.emitTaskDelete(this.deleteTask(task));

    // add task to new list
    this.eventEmitter.emitTaskAdd(
      this.save(
        this.listService.findAll().filter(list => list.title === newStatus)[0],
        task
      )
    );
  }

  toString(obj: any): string {
    return JSON.stringify(obj);
  }

}
