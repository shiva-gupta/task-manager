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

  isPresent(task: Task, arr: Array<Task>): boolean {
    if (task.title !== undefined || task.title !== null) {
      return arr.filter(t => t.title.toLocaleLowerCase() === task.title.toLocaleLowerCase()).length > 0 ? true : false;
    }
    return false;
  }

  save(list: List, task: Task): List {
    task.status = list.title;

    const lists = this.listService.findAll();
    lists.forEach(l => {
      if (l.id === list.id) {
        if (this.isPresent(task, l.tasks)) {
          list = list;
        } else {
          if (l.tasks === null || l.tasks === undefined || l.tasks.length === 0) {
            l.tasks = [task];
          } else {
            task.order = l.tasks[l.tasks.length - 1].order + 1;
            l.tasks = [...l.tasks, task];
          }
          list = l;
        }
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

  update(task: Task): List {
    let resultList: List;
    const lists = this.listService.findAll().map(l => {
      if (task.status === l.title) {
        l.tasks = l.tasks.map(t => t.order === task.order ? task : t);
        resultList = l;
      }
      return l;
    });
    this.listService.saveLists(lists);

    this.eventEmitter.emitTaskUpdate(resultList);

    return resultList;
  }

  changeStatus(task: Task, newStatus: string, order: number = 0, newListTasks?: Array<Task>): boolean {
    let result = true;

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
      if (newListTasks !== undefined) {
        if (newListTasks.length > 0) {
          if (this.isPresent(task, newListTasks)) {
            return false;
          }
        }
      }
      // // delete task from current list
      this.eventEmitter.emitTaskDelete(this.deleteTask(task));

      // // add task to new list
      task.status = newStatus;
      task.order = order;
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

    return result;
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
