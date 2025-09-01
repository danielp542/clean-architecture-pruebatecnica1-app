import { Component, ElementRef, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { DicebearComponent } from '@elementar-ui/components/avatar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'emr-sidebar-toolbar',
  imports: [
    MatIcon,
    DicebearComponent,
    MatButton,
    CommonModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  subscription = 'Free';
  email = '';
  name = '';
  currentUser: any = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadUserData();
    this.assignedAvatars = this.getRandomAvatar();
  }

  assignedAvatars!: string;
  private totalAvatars = 8;

  loadUserData(): void {
    try {
      const userData = sessionStorage.getItem('currentUser');
      if (userData) {
        this.currentUser = JSON.parse(userData);
        this.name = this.currentUser.name || 'Usuario';
        this.email = this.currentUser.email || '';
      } else {
        console.warn('No se encontró información de usuario en sessionStorage');
        this.name = 'Usuario';
        this.email = '';
      }
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
      this.name = 'Usuario';
      this.email = '';
    }
  }

  logout(): void {
    // Eliminar todas las variables del sessionStorage
    sessionStorage.clear();

    // Redirigir al usuario a la página de login
    this.router.navigate(['/']);
  }

  getRandomAvatar(): string {
    // Filtra los avatares disponibles
    const availableAvatars = Array.from({ length: this.totalAvatars }, (_, i) => `assets/avatars/${i + 1}.svg`);
    const randomIndex = Math.floor(Math.random() * availableAvatars.length);
    const randomAvatar = availableAvatars[randomIndex];
    return randomAvatar;
  }
}