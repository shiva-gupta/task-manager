import { ThemeService } from './../../../services/shared/theme.service';
import { EventEmitterService } from './../../../services/shared/event-emitter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isDark = false;

  constructor(
    private eventEmitter: EventEmitterService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    const isDark = this.themeService.getIsDark();
    if (isDark === true || isDark === false) {
      this.isDark = isDark;
      this.eventEmitter.emitToggleTheme(isDark);
    } else {
      this.isDark = false;
    }
  }

  onToggleTheme(isDark: boolean): void {
    this.themeService.setIsDark(isDark);
    this.eventEmitter.emitToggleTheme(isDark);
  }

}
