import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaDatosPersonalesComponent } from './pantalla-datos-personales.component';

describe('PantallaDatosPersonalesComponent', () => {
  let component: PantallaDatosPersonalesComponent;
  let fixture: ComponentFixture<PantallaDatosPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaDatosPersonalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaDatosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
