import { ThemeService } from './../theme.service';
import { TestBed } from '@angular/core/testing';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set dark theme', () => {
    service.setIsDark(true);

    expect(service.getIsDark()).toBe(true);
  });

  it('should get dark theme', () => {
    service.setIsDark(true);

    expect(service.getIsDark()).toBe(true);
  });
});
