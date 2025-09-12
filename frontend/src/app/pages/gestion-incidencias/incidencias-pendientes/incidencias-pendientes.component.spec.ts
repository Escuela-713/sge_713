import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenciasPendientesComponent } from './incidencias-pendientes.component';

describe('IncidenciasPendientesComponent', () => {
  let component: IncidenciasPendientesComponent;
  let fixture: ComponentFixture<IncidenciasPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidenciasPendientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidenciasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
