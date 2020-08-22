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

  deleteById(id: number): void {

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

  save(list: List): boolean {
    let lists = this.findAll();
    if (lists === null || lists.length === 0) {
      this.env.storage.setItem(
        Constant.KEY_LIST,
        JSON.stringify([new List(1, list.title)])
      );
    } else {
      if (this.isPresent(list, lists)) {
        return false;
      }
      // calculate latest primary key
      const id = lists[lists.length - 1].id + 1;
      lists = [...lists, new List(id, list.title)];
      this.env.storage.setItem(Constant.KEY_LIST, this.toString(lists));
    }
    return true;
  }

  toString(obj: any): string {
    return JSON.stringify(obj);
  }

}
