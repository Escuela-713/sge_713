import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAsistenciaComponent } from './filtro-asistencia.component';

describe('FiltroAsistenciaComponent', () => {
  let component: FiltroAsistenciaComponent;
  let fixture: ComponentFixture<FiltroAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroAsistenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
