import { Task } from './task';

export class List {
  id?: number;
  title: string;
  tasks?: Array<Task>;

  constructor(id?: number, title: string = '', tasks: Array<Task> = []) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
  }
}
