import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { PinInputComponent } from '@elementar-ui/components/pin-input';
import { LogoComponent } from '@elementar-ui/components/logo';
import {NgIf} from '@angular/common';
import Swal from 'sweetalert2';
import {ChangeNotificationService} from '../../../core/services/passwor-change-notification.service';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-password-reset',
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    MatIcon,
    LogoComponent,
    NgIf,
    MatProgressSpinner
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
  email: String | null = null;
  private _router = inject(Router);
  isLoading= false;

  constructor(private route: ActivatedRoute, private changeNotificationService: ChangeNotificationService) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || null;

    });
  }
  pin = new FormControl('', [Validators.required]);

  resendCode(): void {
  }

  continue() {
    this._router.navigateByUrl('/auth/set-new-password');
  }

  resetPassword() {

    this.isLoading = true;

    const mailUser = {  mailUser: this.email as string};

    this.changeNotificationService.notification(mailUser).subscribe({
      next: (response) => {
        const statusCode = response.httpStatusCode;
        const message= response.message;
        if(statusCode === 200)
        {
          this.isLoading = false;
          Swal.fire("Éxito", message, "success");
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
