import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchflightComponent } from './searchflight.component';

describe('SearchflightComponent', () => {
  let component: SearchflightComponent;
  let fixture: ComponentFixture<SearchflightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchflightComponent]
    });
    fixture = TestBed.createComponent(SearchflightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
