// edit-loan-modal.component.ts
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoansService } from '../../../../core/services/loans.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-loan-modal',
  templateUrl: './edit-loan-modal.component.html',
  styleUrls: ['./edit-loan-modal.component.scss'],
   imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]
})
export class EditLoanModalComponent {
  editForm: FormGroup;
  isLoading = false;
  minDate: Date;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private loansService: LoansService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditLoanModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 15);

    this.editForm = this.fb.group({
      due_date: [new Date(data.currentDueDate), [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.isLoading = true;
      const dueDate = this.formatDate(this.editForm.value.due_date);

      this.loansService.updateLoanDueDate(this.data.loanId, dueDate).subscribe({
        next: (response) => {
          this.snackBar.open('Fecha actualizada correctamente', 'Cerrar', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error updating loan:', error);
          this.snackBar.open('Error al actualizar la fecha', 'Cerrar', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}