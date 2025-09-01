import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosAutoresComponent } from './todos-autores.component';

describe('TodosAutoresComponent', () => {
  let component: TodosAutoresComponent;
  let fixture: ComponentFixture<TodosAutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosAutoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosAutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
