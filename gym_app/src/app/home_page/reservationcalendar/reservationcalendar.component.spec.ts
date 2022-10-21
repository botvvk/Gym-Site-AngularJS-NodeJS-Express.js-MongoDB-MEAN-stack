import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationcalendarComponent } from './reservationcalendar.component';

describe('ReservationcalendarComponent', () => {
  let component: ReservationcalendarComponent;
  let fixture: ComponentFixture<ReservationcalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationcalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
