import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorIncomesComponent } from './contador-incomes.component';

describe('ContadorIncomesComponent', () => {
  let component: ContadorIncomesComponent;
  let fixture: ComponentFixture<ContadorIncomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContadorIncomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContadorIncomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
