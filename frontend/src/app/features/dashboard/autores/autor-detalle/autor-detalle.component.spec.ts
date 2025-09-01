import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorDetalleComponent } from './autor-detalle.component';

describe('AutorDetalleComponent', () => {
  let component: AutorDetalleComponent;
  let fixture: ComponentFixture<AutorDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
