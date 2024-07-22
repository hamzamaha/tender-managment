import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { HomePageComponent } from './modules/landing-page/home-page/home-page.component';
import { LayoutComponent } from './core/layout/layout.component';
import { MyOffresComponent } from './modules/landing-page/my-offres/my-offres.component';
import { DashbordLayoutComponent } from './core/dashbord-layout/dashbord-layout.component';
import { CardComponent } from './shared/components/card/card.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      { path: '', component: HomePageComponent ,},
      { path: 'offers', component: MyOffresComponent ,},
    ]

  },
  {
    path: 'dashboard',
    component: DashbordLayoutComponent,
    children: [
      { path: '', component: CardComponent ,},
      // { path: 'offers', component: MyOffresComponent ,},
    ]

  },
];
