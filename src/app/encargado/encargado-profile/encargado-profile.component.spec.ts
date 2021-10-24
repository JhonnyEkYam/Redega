import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncargadoProfileComponent } from './encargado-profile.component';

describe('EncargadoProfileComponent', () => {
  let component: EncargadoProfileComponent;
  let fixture: ComponentFixture<EncargadoProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncargadoProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncargadoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
