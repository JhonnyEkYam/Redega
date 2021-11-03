import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioOutcomesComponent } from './usuario-outcomes.component';

describe('UsuarioOutcomesComponent', () => {
  let component: UsuarioOutcomesComponent;
  let fixture: ComponentFixture<UsuarioOutcomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioOutcomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioOutcomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
