import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncargadoHomeComponent } from './encargado-home.component';

describe('EncargadoHomeComponent', () => {
  let component: EncargadoHomeComponent;
  let fixture: ComponentFixture<EncargadoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncargadoHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncargadoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
