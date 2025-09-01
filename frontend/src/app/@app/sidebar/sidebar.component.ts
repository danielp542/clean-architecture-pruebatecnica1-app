import { Component, inject, OnInit, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { Location } from '@angular/common';
import { v7 as uuid } from 'uuid';
import { MatIconButton } from '@angular/material/button';
import {
  SidebarBodyComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarNavGroupComponent,
  SidebarNavGroupMenuComponent,
  SidebarNavGroupToggleComponent,
  SidebarNavHeadingComponent,
  SidebarNavItemComponent,
  SidebarNavItemIconDirective,
  SidebarNavGroupToggleIconDirective,
  SidebarComponent as SidebarElementar,
  SidebarFullViewModeDirective,
  SidebarCompactViewModeDirective
} from '@elementar-ui/components/sidebar';
import { LogoComponent } from '@elementar-ui/components/logo';
import { DicebearComponent } from '@elementar-ui/components/avatar';
import { NavigationItem } from '@elementar-ui/components/navigation';
import {ToolbarComponent} from '../../@store/sidebar';
import {OrderByPipe} from '@elementar-ui/components/core';

// Interfaz para categorías
interface Category {
  id: number;
  name: string;
  slug: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    MatIcon,
    RouterLink,
    ToolbarComponent,
    SidebarBodyComponent,
    SidebarFooterComponent,
    SidebarHeaderComponent,
    SidebarNavComponent,
    DicebearComponent,
    MatIconButton,
    LogoComponent,
    SidebarNavGroupComponent,
    SidebarNavGroupToggleComponent,
    SidebarNavGroupMenuComponent,
    SidebarNavItemComponent,
    SidebarNavHeadingComponent,
    SidebarElementar,
    SidebarFullViewModeDirective,
    SidebarCompactViewModeDirective,
    OrderByPipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  host: {
    'class': 'sidebar',
    '[class.compact]': 'compact'
  }
})
export class SidebarComponent implements OnInit {
  router = inject(Router);
  location = inject(Location);
  height: string | null = '200px';
  compact = false;

  // Datos de ejemplo para categorías (deberías obtenerlos de tu API)
  categories: Category[] = [
    { id: 1, name: 'Ficción', slug: 'ficcion' },
    { id: 2, name: 'No Ficción', slug: 'no-ficcion' },
    { id: 3, name: 'Ciencia', slug: 'ciencia' },
    { id: 4, name: 'Tecnología', slug: 'tecnologia' },
    { id: 5, name: 'Arte', slug: 'arte' }
  ];

  readonly navigation = viewChild.required<any>('navigation');

  navItems = (JSON.parse(sessionStorage.getItem('navigationMenu') || '[]') as NavigationItem[])
    .filter(item => item.type !== 'exclude');

  navItemLinks: NavigationItem[] = [];
  activeKey: null | string = null;

  ngOnInit() {
    console.log(this.navItems);

    this.navItems.forEach(navItem => {
      this.navItemLinks.push(navItem);

      if (navItem.children) {
        this.navItemLinks = this.navItemLinks.concat(navItem.children as NavigationItem[]);
      }
    });
    
    // Agregar las nuevas rutas de libros, autores, categorías y préstamos
    this.navItemLinks.push(
      { key: 'libros-todos', link: 'libros/todos', name: 'Todos los Libros', type: 'link' },
      { key: 'libros-nuevo', link: 'libros/nuevo', name: 'Agregar Libro', type: 'link' },
      { key: 'libros-populares', link: 'libros/populares', name: 'Libros Populares', type: 'link' },
      { key: 'autores-todos', link: 'autores/todos', name: 'Todos los Autores', type: 'link' },
      { key: 'autores-nuevo', link: 'autores/nuevo', name: 'Agregar Autor', type: 'link' },
      { key: 'autores-populares', link: 'autores/populares', name: 'Autores Destacados', type: 'link' },
      { key: 'categorias-todas', link: 'categorias/todas', name: 'Todas las Categorías', type: 'link' },
      { key: 'categorias-nueva', link: 'categorias/nueva', name: 'Agregar Categoría', type: 'link' },
      { key: 'categorias-populares', link: 'categorias/populares', name: 'Categorías Destacadas', type: 'link' },
  
      { key: 'prestamos-todos', link: 'prestamos/todos', name: 'Todos los Préstamos', type: 'link' },
      { key: 'prestamos-mios', link: 'prestamos/mis-prestamos', name: 'Mis Préstamos', type: 'link' },
      { key: 'prestamos-nuevo', link: 'prestamos/nuevo', name: 'Nuevo Préstamo', type: 'link' }
    );

    this.categories.forEach(category => {
      this.navItemLinks.push({
        key: `categoria-${category.id}`,
        link: `/categorias/${category.slug}`,
        name: category.name,
        type: 'link'
      });
    });
    
    this._activateLink();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this._activateLink();
      });
  }

  private _activateLink() {
    const activeLink = this.navItemLinks.find(
      navItem => {
        if (navItem.link === this.location.path()) {
          return true;
        }

        if (navItem.type === 'group') {
          return (this.location.path() !== '/' && this.location.path().includes(navItem.link as string));
        }

        return false;
      }
    );

    if (activeLink) {
      this.activeKey = activeLink.key;
    } else {
      this.activeKey = null;
    }
  }
}