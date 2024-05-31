import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosTutoresComponent } from './datos-tutores.component';

describe('DatosTutoresComponent', () => {
  let component: DatosTutoresComponent;
  let fixture: ComponentFixture<DatosTutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosTutoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosTutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
