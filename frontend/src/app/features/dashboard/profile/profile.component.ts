import {Component, OnInit} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AvatarComponent } from '@elementar-ui/components/avatar';
import {UserService} from '../../../core/services/user.service';
import {UserDto} from '../../../models/user-dto';
import {HttpResponse} from '../../../models/http-response';

@Component({
  selector: 'app-profile',
  imports: [
    MatIcon,
    AvatarComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userData: UserDto | null = null;
  showAll = false;
  showMoreText = '';
  private assignedAvatars: string[] = [];
  private totalAvatars = 8;

  constructor(
    private _userService: UserService,
  ) {
  }

  ngOnInit(): void {
      this.getUserProfile();
      this.updateShowMoreText();
  }

  followed = false;
  peopleAlsoViewed: any[] = [
    {
      avatarUrl: 'assets/avatars/5.svg',
      name: 'Beaulah Hansmann',
      occupation: 'CEO of amazing company'
    },
    {
      avatarUrl: 'assets/avatars/6.svg',
      name: 'Laree Alaman',
      occupation: 'CEO of amazing company'
    },
    {
      avatarUrl: 'assets/avatars/7.svg',
      name: 'Tom Hearron',
      occupation: 'Software engineer'
    }
  ];
  languages = [
    {
      name: 'English',
      level: 'Native'
    },
    {
      name: 'German',
      level: 'Fluent'
    },
    {
      name: 'Spanish',
      level: 'Basic'
    }
  ];


  follow(): void {
    this.followed = true;
  }

  unfollow(): void {
    this.followed = false;
  }

  getUserProfile(): void {
    this._userService.getInfoUser().subscribe({
      next: (data: HttpResponse<UserDto>) => {
        if (data.data) {
          this.userData = data.data;

          if (this.userData?.userGuardianDto?.length > 0) {
            this.userData.userGuardianDto.forEach(guardian => {
              guardian.foto = this.getRandomAvatar();
            });
          }

        }
      },
        error: (err) => {
        console.error('Error al obtener suscripciones', err);
      }
    })
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
    this.updateShowMoreText();
  }

  updateShowMoreText() {
    const total = this.userData?.userExperienceDto?.length || 0;
    const remaining = Math.max(total - 2, 0);
    this.showMoreText = this.showAll
      ? 'Mostrar menos'
      : 'Mostrar mas'; // No mostrar texto si remaining es 0
  }

  getRandomAvatar(): string {
    // Si ya se usaron todos los avatares, reinicia la lista
    if (this.assignedAvatars.length >= this.totalAvatars) {
      this.assignedAvatars = [];
    }

    // Filtra los avatares disponibles
    const availableAvatars = Array.from({ length: this.totalAvatars }, (_, i) => `assets/avatars/${i + 1}.svg`)
      .filter(avatar => !this.assignedAvatars.includes(avatar));

    // Selecciona un avatar aleatorio de los disponibles
    const randomIndex = Math.floor(Math.random() * availableAvatars.length);
    const selectedAvatar = availableAvatars[randomIndex];

    // Almacena el avatar asignado
    this.assignedAvatars.push(selectedAvatar);
    return selectedAvatar;
  }


}
