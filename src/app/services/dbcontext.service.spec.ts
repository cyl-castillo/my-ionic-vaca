import { TestBed } from '@angular/core/testing';

import { DbcontextService } from './dbcontext.service';

describe('DbcontextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbcontextService = TestBed.get(DbcontextService);
    expect(service).toBeTruthy();
  });
});
