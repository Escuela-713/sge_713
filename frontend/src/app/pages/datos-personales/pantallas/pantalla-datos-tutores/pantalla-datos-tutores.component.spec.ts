import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaDatosTutoresComponent } from './pantalla-datos-tutores.component';

describe('PantallaDatosTutoresComponent', () => {
  let component: PantallaDatosTutoresComponent;
  let fixture: ComponentFixture<PantallaDatosTutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaDatosTutoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaDatosTutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
