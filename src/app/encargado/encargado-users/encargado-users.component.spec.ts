import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncargadoUsersComponent } from './encargado-users.component';

describe('EncargadoUsersComponent', () => {
  let component: EncargadoUsersComponent;
  let fixture: ComponentFixture<EncargadoUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncargadoUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncargadoUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
