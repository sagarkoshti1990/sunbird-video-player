import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ViewerService } from './viewer.service';

describe('ViewerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  xit('should be created', () => {
    const service: ViewerService = TestBed.get(ViewerService);
    expect(service).toBeTruthy();
  });
});
