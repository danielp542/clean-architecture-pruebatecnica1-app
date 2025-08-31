import { Routes } from '@angular/router';
import {authTokenGuard} from './core/guard/auth-token.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    
  },
  {
    path: 'error',
    loadChildren: () => import('./features/error/error.module').then(m => m.ErrorModule)
  },
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () => import('./features/error/not-found/not-found.component').then(c => c.NotFoundComponent)
  }
];
