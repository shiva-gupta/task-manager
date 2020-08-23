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

  changeStatus(task: Task, newStatus: string, order: number = 0): void {
    console.log(task);
    if (order === 0) {
      // delete task from current list
      this.eventEmitter.emitTaskDelete(this.deleteTask(task));

      // add task to new list
      this.eventEmitter.emitTaskAdd(
        this.save(
          this.listService.findAll().filter(list => list.title === newStatus)[0],
          task
        )
      );
    } else {
      // delete task from current list
      this.eventEmitter.emitTaskDelete(this.deleteTask(task));

      // add task to new list
      let lists = this.listService.findAll();
      let list = lists.filter(l => l.title === newStatus)[0];
      const updatedList: List = new List(list.id, list.title, []);

      switch (order) {
        case 1: // first position
          updatedList.tasks = [task, ...this.assignOrders(list, 2).tasks];
          break;
        case list.tasks.length + 1:  // last position
          updatedList.tasks = [...this.assignOrders(list, 1).tasks, task];
          break;
        default:  // middle position
          for (let i = 0; i < order - 1; i++) {
            const t = list.tasks[i];
            t.order = i + 1;
            updatedList.tasks = [...updatedList.tasks, t];
          }
          updatedList.tasks = [...updatedList.tasks, task];
          for (let i = order - 1; i < list.tasks.length; i++) {
            const t = list.tasks[i];
            t.order =  i + 2;
            updatedList.tasks = [...updatedList.tasks, t];
          }
      }

      lists = lists.map(l => {
        if (l.title === updatedList.title) {
          l = updatedList;
          this.eventEmitter.emitTaskAdd(l);
        }
        return l;
      });
      this.listService.saveLists(lists);
    }
  }

  assignOrders(list: List, initial: number): List {
    list.tasks = list.tasks.map(task => {
      task.order = initial;
      initial += 1;
      return task;
    });

    return list;
  }

  toString(obj: any): string {
    return JSON.stringify(obj);
  }

}
