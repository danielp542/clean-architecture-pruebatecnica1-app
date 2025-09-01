import {Component, computed, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  LayoutBodyComponent,
  LayoutComponent,
  LayoutHeaderComponent,
  LayoutSidebarComponent, LayoutTopbarComponent
} from '@elementar-ui/components/layout';
import {IncidentsContainerComponent} from '@elementar-ui/components/incidents';
import {AnnouncementComponent} from '@elementar-ui/components/announcement';
import {AppStore} from '../../../store/app.store';
import {HeaderComponent} from '../../../@app/header/header.component';
import {SidebarComponent} from '../../../@app/sidebar/sidebar.component';


@Component({
  selector: 'app-common',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    LayoutBodyComponent,
    LayoutSidebarComponent,
    LayoutHeaderComponent,
    AnnouncementComponent,
    LayoutTopbarComponent,
    IncidentsContainerComponent,
  ],
  templateUrl: './common.component.html',
  styleUrl: './common.component.scss'
})
export class CommonComponent {
  private _appStore = inject(AppStore);
  announcement = computed(() => {
    return this._appStore.announcement();
  });

  onClose() {
    this._appStore.setAnnouncement(null);
  }
}
