import { Constant } from './constant';
import { List } from '../../models/list';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../env/env.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }

  deleteAll(): void {
    this.env.storage.removeItem(Constant.KEY_LIST);
  }

  deleteById(id: number): boolean {
    this.saveLists(
      this.findAll().filter(l => l.id !== id)
    );
    return true;
  }

  findAll(): Array<List> {
    return JSON.parse(this.env.storage.getItem(Constant.KEY_LIST));
  }

  isPresent(list: List, arr: Array<List>): boolean {
    if (list.id !== undefined) {
      return arr.filter(l => l.id === list.id).length > 0 ? true : false;
    }else if (list.title !== undefined || list.title !== null) {
      return arr.filter(l => l.title.toLocaleLowerCase() === list.title.toLocaleLowerCase()).length > 0 ? true : false;
    }
    return false;
  }

  save(list: List): List {
    const lists = this.findAll();
    if (lists === null || lists.length === 0) {
      list.id = 1;
      this.saveLists([list]);
    } else {
      if (this.isPresent(list, lists)) {
        return list;
      }
      // calculate latest primary key
      list.id = lists[lists.length - 1].id + 1;
      this.saveLists(
        [...lists, list]
      );
    }
    return list;
  }

  saveLists(lists: Array<List>): void {
    this.env.storage.setItem(Constant.KEY_LIST, this.toString(lists));
  }

  update(list: List, data: any): List {
    const lists = this.findAll().map(l => {
      if (l.id === list.id) {
        l.title = data.title;
        list.title = data.title;
      }
      return l;
    });
    this.saveLists(lists);
    return list;
  }

  changeOrder(prevIndex: number, currentIndex: number): boolean {
    const lists = this.findAll();
    let finalList: Array<List> = [];

    const selectedList: List = lists[prevIndex];

    for (let i = 0; i < lists.length; i++) {
      if (i !== prevIndex) {
        finalList = [...finalList, lists[i]];
      }
    }

    for (let i = finalList.length; i > currentIndex; i--) {
      finalList[i] = finalList[i - 1];
    }
    finalList[currentIndex] = selectedList;

    this.saveLists(finalList);
    return true;
  }

  toString(obj: any): string {
    return JSON.stringify(obj);
  }

}
