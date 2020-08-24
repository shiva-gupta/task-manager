import { ThemeService } from './../../services/shared/theme.service';
import { EventEmitterService } from './../../services/shared/event-emitter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isDark = false;

  constructor(
    private eventEmitter: EventEmitterService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.eventEmitter.toggleTheme.subscribe((isDark: boolean) => {
      this.isDark = isDark;
    });

    const isDark = this.themeService.getIsDark();
    if (isDark === true || isDark === false) {
      this.isDark = isDark;
    }
  }

}
