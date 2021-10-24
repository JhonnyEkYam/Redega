import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorHomeComponent } from './contador-home.component';

describe('ContadorHomeComponent', () => {
  let component: ContadorHomeComponent;
  let fixture: ComponentFixture<ContadorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContadorHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContadorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
