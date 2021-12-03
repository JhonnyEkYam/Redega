import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOutcomeComponent } from './create-outcome.component';

describe('CreateOutcomeComponent', () => {
  let component: CreateOutcomeComponent;
  let fixture: ComponentFixture<CreateOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOutcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
