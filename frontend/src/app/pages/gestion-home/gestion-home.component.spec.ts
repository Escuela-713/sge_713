import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionHomeComponent } from './gestion-home.component';

describe('GestionHomeComponent', () => {
  let component: GestionHomeComponent;
  let fixture: ComponentFixture<GestionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
