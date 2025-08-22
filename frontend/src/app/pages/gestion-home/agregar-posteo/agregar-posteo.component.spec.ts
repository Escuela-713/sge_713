import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPosteoComponent } from './agregar-posteo.component';

describe('AgregarPosteoComponent', () => {
  let component: AgregarPosteoComponent;
  let fixture: ComponentFixture<AgregarPosteoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarPosteoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPosteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
