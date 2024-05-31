import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaDatosAlumnoComponent } from './pantalla-datos-alumno.component';

describe('PantallaDatosAlumnoComponent', () => {
  let component: PantallaDatosAlumnoComponent;
  let fixture: ComponentFixture<PantallaDatosAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaDatosAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaDatosAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
