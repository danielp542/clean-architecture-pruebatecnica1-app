import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '@elementar-ui/components/dashboard';
import {CommonComponent} from './common/common.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./common/common.component').then(c => c.CommonComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./main/main.component').then(c => c.MainComponent),
        title: 'Dashboard'
      },
      {
        path: 'libros/todos',
        loadComponent: () => import('./academy-subscription/academy-subscription.component')
          .then(c => c.AcademySubscriptionComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent)
      },
      {
        path: 'myacademy',
        loadComponent: () => import('./my-academy/my-academy.component').then(c => c.MyAcademyComponent)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
