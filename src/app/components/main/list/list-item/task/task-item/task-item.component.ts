import { Task } from './../../../../../../models/task';
import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task;
  display = true;

  constructor() { }

  ngOnInit(): void {
  }

  getCreated(): string {
    return new DatePipe('en-IN').transform(this.task.date, 'dd/MM/yyyy');
  }

  getEcd(): string {
    return new DatePipe('en-IN').transform(this.task.ecd, 'dd/MM/yyyy');
  }

}
