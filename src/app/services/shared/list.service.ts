import { Constant } from './constant';
import { List } from '../../models/list';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  findById(id: number): List {
    return null;
  }

  findByTitle(title: string): List {
    return null;
  }

  isPresent(list: List, arr: Array<List>): boolean {
    if (list.id !== undefined) {
      return arr.filter(l => l.id === list.id).length > 0 ? true : false;
    }else if (list.title !== undefined || list.title !== null) {
      return arr.filter(l => l.title === list.title).length > 0 ? true : false;
    }
    return false;
  }

  save(list: List): List {
    const lists = this.findAll();
    if (lists === null || lists.length === 0) {
      this.saveLists([new List(1, list.title)]);
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

  toString(obj: any): string {
    return JSON.stringify(obj);
  }

}
