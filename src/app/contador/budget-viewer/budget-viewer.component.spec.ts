import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetViewerComponent } from './budget-viewer.component';

describe('BudgetViewerComponent', () => {
  let component: BudgetViewerComponent;
  let fixture: ComponentFixture<BudgetViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
