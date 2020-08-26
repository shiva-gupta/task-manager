import { ToastrService } from 'ngx-toastr';
import { TaskService } from './../../../../../services/shared/task.service';
import { CommonService } from './../../../../../services/shared/common.service';
import { Task } from './../../../../../models/task';
import { List } from 'src/app/models/list';
import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() list: List;

  constructor(
    private commonService: CommonService,
    private taskService: TaskService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.changeStatus(event);
  }

  changeStatus(event: CdkDragDrop<string[]>): void {
    const newStatus = event.container.id;
    const order = event.currentIndex + 1;

    const task: Task = JSON.parse(
      this.commonService.toString(event.container.data[order - 1])
    );

    if (event.previousContainer === event.container) {
      this.taskService.changeStatus(task, newStatus, order);
    } else {
      const result = this.taskService.changeStatus(task, newStatus, order, this.getNewListExistingTasks(event.container.data, task));
      if (!result) {
        this.reverseDrag(event);
        this.toastr.error('Target List has already Task with similar Title');
      }
    }
  }

  reverseDrag(event: CdkDragDrop<string[]>): void {
    transferArrayItem(event.container.data,
                      event.previousContainer.data,
                      event.currentIndex,
                      event.previousIndex);
  }

  getNewListExistingTasks(tasks: string[], selectedTask: Task): Array<Task> {
    let tks: Array<Task> = [];

    for (let i = 0; i < tasks.length; ++i) {
      const t: Task = JSON.parse(JSON.stringify(tasks[i]));
      if (t.status !== selectedTask.status) {
        tks = [...tks, t];
      }
    }
    return tks;
  }

}
