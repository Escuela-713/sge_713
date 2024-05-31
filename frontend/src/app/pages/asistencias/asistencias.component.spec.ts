import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciasComponent } from './asistencias.component';

describe('AsistenciasComponent', () => {
  let component: AsistenciasComponent;
  let fixture: ComponentFixture<AsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
