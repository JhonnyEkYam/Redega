import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorProfileComponent } from './contador-profile.component';

describe('ContadorProfileComponent', () => {
  let component: ContadorProfileComponent;
  let fixture: ComponentFixture<ContadorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContadorProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContadorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
