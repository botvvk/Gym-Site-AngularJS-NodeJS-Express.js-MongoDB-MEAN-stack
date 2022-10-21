import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckreservationuserComponent } from './checkreservationuser.component';

describe('CheckreservationuserComponent', () => {
  let component: CheckreservationuserComponent;
  let fixture: ComponentFixture<CheckreservationuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckreservationuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckreservationuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
