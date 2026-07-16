import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: authRoutes
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'catalog',
        loadChildren: () => import('./features/catalog/catalog.routes').then(m => m.CATALOG_ROUTES)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];