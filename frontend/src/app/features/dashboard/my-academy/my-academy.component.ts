import {Component, OnInit} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AvatarComponent } from '@elementar-ui/components/avatar';
import {AcademyDto} from '../../../models/academy-dto';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-my-academy',
  imports: [
    MatButton,
    MatIcon,
    AvatarComponent,
    NgOptimizedImage
  ],
  templateUrl: './my-academy.component.html',
  styleUrl: './my-academy.component.scss'
})
export class MyAcademyComponent implements OnInit {

  academyDto!: AcademyDto;

  ngOnInit(): void {
    const storedAcademy = sessionStorage.getItem('academy');
    if (storedAcademy) {
      this.academyDto = JSON.parse(storedAcademy);
    }
  }

  // En el componente TypeScript
  get imageSrc(): string {
    const fileType = this.academyDto.mediaFile?.fileType;
    const data = this.academyDto.mediaFile?.data;
    return fileType && data ? `data:${fileType};base64,${data}` : '';
  }

}
