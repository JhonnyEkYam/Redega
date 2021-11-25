import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimetestComponent } from './realtimetest.component';

describe('RealtimetestComponent', () => {
  let component: RealtimetestComponent;
  let fixture: ComponentFixture<RealtimetestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealtimetestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
