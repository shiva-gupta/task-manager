import { List } from '../../../models/list';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TaskService } from './../task.service';
import { Task } from '../../../models/task';
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

    expect(list.tasks.length).toBeGreaterThanOrEqual(lists[0].tasks.length);
  });

  // it('(deleteTask()) should delete task', () => {
  //   // listService.deleteAll();
  //   // listService.save(lists[0]);

  //   console.log(lists);
  //   const resultList = service.deleteTask(lists[0].tasks[0]);

  //   expect(resultList.tasks.length).toBeLessThan(lists[0].tasks.length);
  // });

  it('should convert object to string', () => {
    const str = service.toString(lists[0]);
    expect(str).toBe(JSON.stringify(lists[0]));
  });

  it('should assign orders in assending order', () => {
    const list = service.assignOrders(lists[0], 1);
    const orders = list.tasks.map((t: Task) => t.order);

    expect(orders).toEqual([1, 2]);
  });

  it('should change status', () => {
    listService.save(lists[0]);
    listService.save(lists[1]);

    service.changeStatus(lists[0].tasks[0], lists[1].title);
    const ls = listService.findAll();

    let result = false;
    ls.forEach(l => {
      if (l.title === lists[1].title) {
        l.tasks.forEach(t => {
          if (t.title === lists[1].tasks[0].title) {
            result = true;
          }
        });
      }
    });

    expect(result).toBe(true);
  });

  // it('should change status and order', () => {
  //   listService.save(lists[0]);
  //   listService.save(lists[1]);

  //   service.changeStatus(lists[0].tasks[0], lists[1].title, 1);
  //   const ls = listService.findAll();

  //   let result = true;
  //   ls.forEach(l => {
  //     if (l.title === lists[1].title) {
  //       l.tasks.forEach(t => {
  //         if (t.title === lists[1].tasks[0].title) {
  //           result = true;
  //         }
  //       });
  //     }
  //   });

  //   expect(result).toBe(true);
  // });

  it('should update task detail', () => {
    const task = lists[0].tasks[0];
    task.title = 'task-1011';

    const list = service.update(task);

    let result = true;
    list.tasks.forEach(t => {
      if (t.order === task.order && t.title === task.title) {
        result = true;
      }
    });

    expect(result).toBe(true);
  });
});
