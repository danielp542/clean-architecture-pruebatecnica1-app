import {
  inject,
} from '@angular/core';
import { TitleStrategy,  } from '@angular/router';

import {ApplicationConfig, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ENVIRONMENT, EnvironmentService, GlobalStore, PageTitleStrategyService } from '@elementar-ui/components/core';
import { LayoutSidebarStore } from '@elementar-ui/components/layout';
import { routes } from './app.routes';
import {environment} from '../environments/environment';
import {authInterceptor} from './core/interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideStore(),
    provideNativeDateAdapter(),
    provideAppInitializer(() => {
      const envService = inject(EnvironmentService);
      const globalStore = inject(GlobalStore);
      const layoutSidebarStore = inject(LayoutSidebarStore);
      return new Promise((resolve, reject) => {
        layoutSidebarStore.showSidebarVisibility('root', true); // show or hide main sidebar on initial state
        globalStore.setPageTitle(envService.getValue('pageTitle'));
        resolve(true);
      });
    }),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    {
      provide: ENVIRONMENT,
      useValue: environment
    },
    {
      provide: TitleStrategy,
      useClass: PageTitleStrategyService
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    }
  ]
};
