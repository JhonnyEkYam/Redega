import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOutcomeCComponent } from './edit-outcome-c.component';

describe('EditOutcomeCComponent', () => {
  let component: EditOutcomeCComponent;
  let fixture: ComponentFixture<EditOutcomeCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOutcomeCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOutcomeCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
