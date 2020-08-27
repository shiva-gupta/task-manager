import { List } from 'src/app/models/list';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ListService } from '../list.service';

describe('ListService', () => {
  let service: ListService;

  const lists = [
    new List(1, 'list-1'),
    new List(2, 'list-2')
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('(save) should create new list (if created, will be assigned unique id)', () => {
    service.deleteAll();

    const list: List = new List();
    list.title = 'task-title';

    const createdList = service.save(list);

    expect(createdList.id).toBeDefined();
  });

  it('(save()) should not insert list with duplicate title (if perfect, id will be undefined)', () => {
    service.deleteAll();

    const list: List = new List();
    list.title = 'task-title';

    service.save(list);
    list.id = undefined;

    const createdList = service.save(list);

    expect(createdList.id).toBeUndefined();
  });

  it('(isPresent()) should return true if list already present', () => {
    service.save(lists[0]);

    const result = service.isPresent(new List(1, 'list-1'), lists);

    expect(result).toBeTrue();
  });

  it('(isPresent()) should return false if list not present', () => {
    const result = service.isPresent(new List(10, 'list-10'), lists);

    expect(result).toBeFalse();
  });

  it('(deleteAll()) if all list deleted, findAll should return null', () => {
    service.deleteAll();

    expect(service.findAll()).toBe(null);
  });

  it('(update()) should contain new title if updated', () => {
    service.deleteAll();
    service.save(lists[0]);

    const list = service.update(lists[0], {
      title: 'list-11'
    });

    expect(list.title).toBe('list-11');
  });

  it('should convert object to string', () => {
    const str = service.toString(lists);
    expect(str).toBe(JSON.stringify(lists));
  });

  it('should store lists', () => {
    service.saveLists(lists);
    const ls = service.findAll();

    expect(ls).toBeDefined();
  });

  it('should delete list', () => {
    expect(service.deleteById(1)).toBe(true);
  });

  // it('should change list order', () => {
  //   const result = service.changeOrder(0, 1);
  //   expect(result).toBe(true);
  // });
});
