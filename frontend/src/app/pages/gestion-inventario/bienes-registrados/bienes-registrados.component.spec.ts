import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienesRegistradosComponent } from './bienes-registrados.component';

describe('BienesRegistradosComponent', () => {
  let component: BienesRegistradosComponent;
  let fixture: ComponentFixture<BienesRegistradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BienesRegistradosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienesRegistradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
