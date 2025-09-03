import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionMesaComponent } from './inscripcion-mesa.component';

describe('InscripcionMesaComponent', () => {
  let component: InscripcionMesaComponent;
  let fixture: ComponentFixture<InscripcionMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionMesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
