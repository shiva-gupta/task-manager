import { Constant } from './constant';
import { EnvService } from './../env/env.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private env: EnvService
  ) { }

  setIsDark(isDark: boolean): void {
    const key = Constant.KEY_IS_DARK;
    this.env.storage.setItem(key, JSON.stringify(isDark));
  }

  getIsDark(): boolean {
    const key = Constant.KEY_IS_DARK;
    return JSON.parse(this.env.storage.getItem(key));
  }
}
