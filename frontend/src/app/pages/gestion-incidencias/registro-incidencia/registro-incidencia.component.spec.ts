import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroIncidenciaComponent } from './registro-incidencia.component';

describe('RegistroIncidenciaComponent', () => {
  let component: RegistroIncidenciaComponent;
  let fixture: ComponentFixture<RegistroIncidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroIncidenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
