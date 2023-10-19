import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaNavegacionComponent } from './pantalla-navegacion.component';

describe('PantallaNavegacionComponent', () => {
  let component: PantallaNavegacionComponent;
  let fixture: ComponentFixture<PantallaNavegacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaNavegacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaNavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
