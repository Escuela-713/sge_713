import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarBienComponent } from './registrar-bien.component';

describe('RegistrarBienComponent', () => {
  let component: RegistrarBienComponent;
  let fixture: ComponentFixture<RegistrarBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarBienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
