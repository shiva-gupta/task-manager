import { List } from 'src/app/models/list';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TaskService } from './../task.service';
import { Task } from 'src/app/models/task';
import { ListService } from '../list.service';

describe('TaskService', () => {
  let service: TaskService;
  let listService: ListService;

  const lists = [
    new List(10, 'list-10', [
      new Task('task-101', new Date(), new Date(), 'task-101 description', 1, 'list-10'),
      new Task('task-102', new Date(), new Date(), 'task-102 description', 2, 'list-10')
    ]),
    new List(11, 'list-11', [
      new Task('task-111', new Date(), new Date(), 'task-111 description', 1, 'list-11'),
      new Task('task-112', new Date(), new Date(), 'task-112 description', 2, 'list-11')
    ])
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(TaskService);
    listService = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('(save()) should create new task in list', () => {
    listService.save(lists[0]);

    const task = new Task('task-103', new Date(), new Date(), 'task-103 description', 3, lists[0].title);

    const list = service.save(lists[0], task);

    expect(list.tasks.length).toBeGreaterThan(lists[0].tasks.length);
  });

  // it('(deleteTask()) should delete task', () => {
  //   // listService.deleteAll();
  //   // listService.save(lists[0]);

  //   console.log(lists);
  //   const resultList = service.deleteTask(lists[0].tasks[0]);

  //   expect(resultList.tasks.length).toBeLessThan(lists[0].tasks.length);
  // });
});
