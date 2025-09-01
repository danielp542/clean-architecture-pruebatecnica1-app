import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoanModalComponent } from './edit-loan-modal.component';

describe('EditLoanModalComponent', () => {
  let component: EditLoanModalComponent;
  let fixture: ComponentFixture<EditLoanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLoanModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLoanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
