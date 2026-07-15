import { Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { CarritoComponent } from './carrito/carrito.component';

export const CATALOG_ROUTES: Routes = [
  { path: '', component: CatalogoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: ':id', component: DetalleProductoComponent }
];