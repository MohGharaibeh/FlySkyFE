import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchdateComponent } from './searchdate.component';

describe('SearchdateComponent', () => {
  let component: SearchdateComponent;
  let fixture: ComponentFixture<SearchdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchdateComponent]
    });
    fixture = TestBed.createComponent(SearchdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
