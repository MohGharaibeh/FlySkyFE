import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterdUserComponent } from './registerd-user.component';

describe('RegisterdUserComponent', () => {
  let component: RegisterdUserComponent;
  let fixture: ComponentFixture<RegisterdUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterdUserComponent]
    });
    fixture = TestBed.createComponent(RegisterdUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
