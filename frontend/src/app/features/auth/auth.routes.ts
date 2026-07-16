// auth.routes.ts: Definicion de rutas del modulo de autenticacion (/login, /register)
// auth.routes.ts: Definicion de rutas del modulo de autenticacion (/login, /registro)

import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';


export const authRoutes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'registro',
    component: RegistroComponent
  }

];