import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDomicilioComponent } from './datos-domicilio.component';

describe('DatosDomicilioComponent', () => {
  let component: DatosDomicilioComponent;
  let fixture: ComponentFixture<DatosDomicilioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosDomicilioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosDomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
