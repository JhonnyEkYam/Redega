import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudOutcomesComponent } from './crud-outcomes.component';

describe('CrudOutcomesComponent', () => {
  let component: CrudOutcomesComponent;
  let fixture: ComponentFixture<CrudOutcomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudOutcomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudOutcomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
