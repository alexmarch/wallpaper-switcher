import { TestBed, inject } from '@angular/core/testing';

import { UnsplashService } from './unsplash.service';

describe('UnsplashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsplashService]
    });
  });

  it('should ...', inject([UnsplashService], (service: UnsplashService) => {
    expect(service).toBeTruthy();
  }));
});
