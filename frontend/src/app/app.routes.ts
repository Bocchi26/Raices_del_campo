// app.routes.ts: Configuracion principal de rutas de la aplicacion Angular con lazy loading
// app.routes.ts: Configuracion principal de rutas de la aplicacion Angular con lazy loading

import { Routes } from '@angular/router';


export const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes')
      .then(m => m.authRoutes)
  },

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'auth/login'
  }

];