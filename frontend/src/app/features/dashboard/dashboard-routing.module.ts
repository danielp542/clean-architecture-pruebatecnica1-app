import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '@elementar-ui/components/dashboard';
import {CommonComponent} from './common/common.component';
import { AgregarLibroComponent } from './libros/agregar-libro/agregar-libro.component';
import { LibroDetalleComponent } from './libros/libro-detalle/libro-detalle.component';
import { AutorDetalleComponent } from './autores/autor-detalle/autor-detalle.component';
import { AgregarAutorComponent } from './autores/agregar-autor/agregar-autor.component';
import { AgregarCategoriaComponent } from './categorias/agregar-categoria/agregar-categoria.component';
import { GeneroDetalleComponent } from './categorias/genero-detalle/genero-detalle.component';

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
        loadComponent: () => import('./libros/todos-libros/todos-libros.component')
          .then(c => c.TodosLibrosComponent)
      },
      {
        path: 'libros/nuevo',
        loadComponent: () => import('./libros/agregar-libro/agregar-libro.component')
          .then(c => c.AgregarLibroComponent)
      },
      {
        path: 'libros/populares',
        loadComponent: () => import('./libros/libros-populares/libros-populares.component')
          .then(c => c.LibrosPopularesComponent)
      },
      {
        path: 'autores/todos',
        loadComponent: () => import('./autores/todos-autores/todos-autores.component')
          .then(c => c.TodosAutoresComponent)
      },
      {
        path: 'autores/nuevo',
        loadComponent: () => import('./autores/agregar-autor/agregar-autor.component')
          .then(c => c.AgregarAutorComponent)
      },
      {
        path: 'autores/populares',
        loadComponent: () => import('./autores/autores-destacados/autores-destacados.component')
          .then(c => c.AutoresDestacadosComponent)
      },
      {
        path: 'categorias/todas',
        loadComponent: () => import('./categorias/todas-categorias/todas-categorias.component')
          .then(c => c.TodasCategoriasComponent)
      },
      {
        path: 'categorias/nueva',
        loadComponent: () => import('./categorias/agregar-categoria/agregar-categoria.component')
          .then(c => c.AgregarCategoriaComponent)
      },
      {
        path: 'categorias/populares',
        loadComponent: () => import('./categorias/categorias-destacadas/categorias-destacadas.component')
          .then(c => c.CategoriasDestacadasComponent)
      },
      {
        path: 'prestamos/todos',
        loadComponent: () => import('./prestamos/todos-prestamos/todos-prestamos.component')
          .then(c => c.TodosPrestamosComponent)
      },
      {
        path: 'prestamos/mis-prestamos',
        loadComponent: () => import('./prestamos/mis-prestamos/mis-prestamos.component')
          .then(c => c.MisPrestamosComponent)
      },
      {
        path: 'prestamos/nuevo',
        loadComponent: () => import('./prestamos/nuevo-prestamo/nuevo-prestamo.component')
          .then(c => c.NuevoPrestamoComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent)
      },
      {
        path: 'nuevo',
        component: AgregarLibroComponent
      },
      {
        path: 'libros/:id',
        component: LibroDetalleComponent
      },
      {
        path: 'libros/editar/:id',
        component: AgregarLibroComponent
      },
      {
        path: 'autores/editar/:id',
        component: AgregarAutorComponent
      },
      {
        path: 'autores/:id',
        component: AutorDetalleComponent
      },
      {
        path: 'autores/editar/:id',
        component: AgregarAutorComponent
      },
      {
        path: 'generos/editar/:id',
        component: AgregarCategoriaComponent
      },
      {
        path: 'generos/:id',
        component: GeneroDetalleComponent
      },
      {
        path: 'generos/editar/:id',
        component: AgregarCategoriaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }