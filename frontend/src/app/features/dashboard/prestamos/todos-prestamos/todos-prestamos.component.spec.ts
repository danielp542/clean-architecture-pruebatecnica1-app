import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosPrestamosComponent } from './todos-prestamos.component';

describe('TodosPrestamosComponent', () => {
  let component: TodosPrestamosComponent;
  let fixture: ComponentFixture<TodosPrestamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosPrestamosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
