import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroDatosPersonalesComponent } from './filtro-datos-personales.component';

describe('FiltroDatosPersonalesComponent', () => {
  let component: FiltroDatosPersonalesComponent;
  let fixture: ComponentFixture<FiltroDatosPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroDatosPersonalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltroDatosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
