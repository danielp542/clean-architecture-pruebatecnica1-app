import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPrestamoComponent } from './nuevo-prestamo.component';

describe('NuevoPrestamoComponent', () => {
  let component: NuevoPrestamoComponent;
  let fixture: ComponentFixture<NuevoPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoPrestamoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
