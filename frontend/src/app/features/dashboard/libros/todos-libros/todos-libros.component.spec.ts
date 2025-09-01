import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosLibrosComponent } from './todos-libros.component';

describe('TodosLibrosComponent', () => {
  let component: TodosLibrosComponent;
  let fixture: ComponentFixture<TodosLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosLibrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
