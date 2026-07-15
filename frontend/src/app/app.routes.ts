import { Routes } from '@angular/router';

import { authRoutes } from './features/auth/auth.routes';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

import { HomeComponent } from './features/home/home.component';

import { authGuard } from './core/guards/auth.guard';



export const routes: Routes = [


  {
    path:'auth',
    children: authRoutes
  },


  {
    path:'',
    component: MainLayoutComponent,
    canActivate:[authGuard],
    children:[

      {
        path:'',
        component:HomeComponent
      }

    ]
  },


  {
    path:'**',
    redirectTo:''
  }


];