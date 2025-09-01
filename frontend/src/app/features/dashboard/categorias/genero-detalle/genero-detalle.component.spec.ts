import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroDetalleComponent } from './genero-detalle.component';

describe('GeneroDetalleComponent', () => {
  let component: GeneroDetalleComponent;
  let fixture: ComponentFixture<GeneroDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneroDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneroDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
