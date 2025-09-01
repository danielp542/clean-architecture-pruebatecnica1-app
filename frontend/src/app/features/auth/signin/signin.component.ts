import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { MatButton } from '@angular/material/button';
import {MatError, MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { HorizontalDividerComponent } from '@elementar-ui/components/divider';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {SelectAcademyModalComponent} from "../select-academy-modal/select-academy-modal.component";
import {NavigationItem} from "@elementar-ui/components/navigation";

@Component({
  selector: 'app-signin',
  imports: [
    RouterLink,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    MatSuffix,
    HorizontalDividerComponent,
    MatError,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService,
              private router: Router,
              private dialog: MatDialog,) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const credentials = {
      academyId: 0, // Se puede modificar según la lógica de negocio
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        


        
          

         if (response?.access_token) {
          sessionStorage.setItem('authToken', response.access_token);

          console.log('Token guardado:', sessionStorage.getItem('authToken')); // <-- debería mostrar el token

          this.router.navigate(['/dashboard']);
        }

      
      },
      error: (error) => {
        console.error('Error en login:', error);

        // Si el backend envía un mensaje de error en el cuerpo de la respuesta
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Credenciales incorrectas. Intente de nuevo.';
        }

        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);

        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });

  }

  private mapMenu(menu: any[]): NavigationItem[] {
    return menu.map(item => this.mapMenuItem(item));
  }

  private mapMenuItem(item: any): NavigationItem {
    return {
      key: item.id.toString(),
      type: item.menuType as 'heading' | 'group' | 'link' | 'item' | 'divider',
      name: item.name,
      icon: item.icon,
      link: item.route || undefined, // Si `route` es null, lo ignoramos
      children: item.children?.length ? item.children.map((child: any) => this.mapMenuItem(child)) : [],
      sortOrder: item.sortOrder,
    };
  }


 

}
