import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoresDestacadosComponent } from './autores-destacados.component';

describe('AutoresDestacadosComponent', () => {
  let component: AutoresDestacadosComponent;
  let fixture: ComponentFixture<AutoresDestacadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoresDestacadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoresDestacadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
