import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckouUserProfileComponent } from './checkou-user-profile.component';

describe('CheckouUserProfileComponent', () => {
  let component: CheckouUserProfileComponent;
  let fixture: ComponentFixture<CheckouUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckouUserProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckouUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
