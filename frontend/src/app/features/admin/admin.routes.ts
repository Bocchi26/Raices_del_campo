// admin.routes.ts: Definicion de rutas del modulo de administracion (/admin/dashboard, /admin/products, etc.)
// admin.routes.ts
import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionProductosComponent } from './gestion-productos/gestion-productos.component';
import { GestionPedidosComponent } from './gestion-pedidos/gestion-pedidos.component';
import { ReportesComponent } from './reportes/reportes.component';

import { adminGuard } from '../../core/guards/admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'productos',
    component: GestionProductosComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'pedidos',
    component: GestionPedidosComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    canActivate: [adminGuard]
  }
];