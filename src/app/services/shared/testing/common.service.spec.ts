import { CommonService } from './../common.service';
import { TestBed } from '@angular/core/testing';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert object to string', () => {
    const obj = {title: 'title'};
    const str = service.toString(obj);
    expect(str).toBe(JSON.stringify(obj));
  });
});
