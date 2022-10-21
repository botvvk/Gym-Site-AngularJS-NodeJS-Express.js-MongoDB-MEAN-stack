import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassescComponent } from './classesc.component';

describe('ClassescComponent', () => {
  let component: ClassescComponent;
  let fixture: ComponentFixture<ClassescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
