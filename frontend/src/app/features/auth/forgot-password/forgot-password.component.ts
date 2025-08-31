import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { LogoComponent } from '@elementar-ui/components/logo';
import {ChangeNotificationService} from '../../../core/services/passwor-change-notification.service';
import Swal from 'sweetalert2';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    RouterLink,
    ReactiveFormsModule,
    MatIcon,
    LogoComponent,
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private _router = inject(Router);

  email = new FormControl('', [Validators.required, Validators.email]);
  isLoading = false;
  constructor(private changeNotificationService: ChangeNotificationService) {}

  resetPassword() {
  if (this.email.invalid) {
    console.warn("el email invalid");
    return;
  }
    this.isLoading = true;

  const mailUser = { mailUser:this.email.value as string };

  this.changeNotificationService.notification(mailUser).subscribe({
    next: (response) => {
      const statusCode = response.httpStatusCode;
      const message= response.message;
      if(statusCode === 200)
      {
        this.isLoading = false;
        Swal.fire("Éxito", message, "success");
        this._router.navigate(['/auth/password-reset'], {
          queryParams: { email: this.email.value }
        });
      }else{
        this.isLoading = false;
        console.log("mesage: ",message  , statusCode);
      }
    },
    error:(error)=>{
      this.isLoading = false;
      console.error("Error en la petición", error);
      Swal.fire("Error", error.error?.message||"No se pudo enviar la notificación", "error");
    }
  });
  }
}
