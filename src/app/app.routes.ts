import { Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { LibroComponent } from './libro/libro.component'; // 👈 Corregido
import { ProductoComponent } from './productos/producto.component';
import { Ejercicio1Component } from './ejercicio1/ejercicio1.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'libros', component: LibroComponent },
      { path: 'productos', component: ProductoComponent },
      { path: 'ejercicio1', component: Ejercicio1Component },
      { path: 'about', component: AboutComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];
