import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseseditComponent } from './classesedit.component';

describe('ClasseseditComponent', () => {
  let component: ClasseseditComponent;
  let fixture: ComponentFixture<ClasseseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasseseditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
