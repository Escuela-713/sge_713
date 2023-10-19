import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosLocalidadComponent } from './datos-localidad.component';

describe('DatosLocalidadComponent', () => {
  let component: DatosLocalidadComponent;
  let fixture: ComponentFixture<DatosLocalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosLocalidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosLocalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
