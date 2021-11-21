import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOutcomeComponent } from './edit-outcome.component';

describe('EditOutcomeComponent', () => {
  let component: EditOutcomeComponent;
  let fixture: ComponentFixture<EditOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOutcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
