import { List } from 'src/app/models/list';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() list: List;

  constructor() { }

  ngOnInit(): void {
  }

}
