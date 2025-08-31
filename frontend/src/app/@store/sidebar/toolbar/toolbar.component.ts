import {Component, ElementRef, OnInit} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import { DicebearComponent } from '@elementar-ui/components/avatar';
import {Router} from '@angular/router';

@Component({
  selector: 'emr-sidebar-toolbar',
  imports: [
    MatIcon,
    DicebearComponent,
    MatButton
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  subscription = 'Free';
  email = 'elementarlabs@gmail.com';
  name = 'Pavel Salauyou';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.assignedAvatars = this.getRandomAvatar();
    }

  assignedAvatars!: string;
  private totalAvatars = 8;

  logout(): void {
    // Eliminar todas las variables del sessionStorage
    sessionStorage.clear();

    // Redirigir al usuario a la página de login
    this.router.navigate(['/auth']);
  }

  getRandomAvatar(): string {
    // Filtra los avatares disponibles
    const availableAvatars = Array.from({ length: this.totalAvatars }, (_, i) => `assets/avatars/${i + 1}.svg`);


    const randomIndex = Math.floor(Math.random() * availableAvatars.length);
    const randomAvatar = availableAvatars[randomIndex];
    return randomAvatar;
  }


}
