import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActaVolanteComponent } from './acta-volante.component';

describe('ActaVolanteComponent', () => {
  let component: ActaVolanteComponent;
  let fixture: ComponentFixture<ActaVolanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActaVolanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActaVolanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
