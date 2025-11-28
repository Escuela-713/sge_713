import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:frontend/src/app/pages/gestion-inventario/inventario/inventario.component.spec.ts
import { InventarioComponent } from './inventario.component';

describe('InventarioComponent', () => {
  let component: InventarioComponent;
  let fixture: ComponentFixture<InventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioComponent);
========
import { CreacionDeMesaComponent } from './creacion-de-mesa.component';

describe('CreacionDeMesaComponent', () => {
  let component: CreacionDeMesaComponent;
  let fixture: ComponentFixture<CreacionDeMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreacionDeMesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionDeMesaComponent);
>>>>>>>> origin/nicolas:frontend/src/app/pages/gestion-examenes-finales/creacion-de-mesa/creacion-de-mesa.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
