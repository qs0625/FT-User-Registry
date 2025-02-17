import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerkeyComponent } from './answerkey.component';

describe('AnswerkeyComponent', () => {
  let component: AnswerkeyComponent;
  let fixture: ComponentFixture<AnswerkeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerkeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
