import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPosteoComponent } from './editar-posteo.component';

describe('EditarPosteoComponent', () => {
  let component: EditarPosteoComponent;
  let fixture: ComponentFixture<EditarPosteoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPosteoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPosteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
