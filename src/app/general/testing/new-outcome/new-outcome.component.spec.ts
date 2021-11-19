import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOutcomeComponent } from './new-outcome.component';

describe('NewOutcomeComponent', () => {
  let component: NewOutcomeComponent;
  let fixture: ComponentFixture<NewOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOutcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
