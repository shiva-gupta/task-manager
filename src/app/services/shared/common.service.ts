import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  toString(obj: any): string {
    return JSON.stringify(obj);
  }
}
