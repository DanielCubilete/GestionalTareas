// app.routes.ts

import { HomeComponent } from './components/pages/home/home.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { ContactUsComponent } from './components/pages/contact-us/contact-us.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DefaultComponent } from './components/pages/default/default.component';
import { AdminDashboardComponent } from './components/appweb/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/appweb/user-dashboard/user-dashboard.component';
import { Error404Component } from './components/pages/error404/error404.component';
import { SuscriptionsComponent } from './components/pages/suscriptions/suscriptions.component';


export const routes = [
  { path: '', component: DefaultComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'default', component: DefaultComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'dashboard', component: UserDashboardComponent },

  // 👇 aquí el cambio importante
  {
    path: 'suscriptions',
    loadComponent: () =>
      import('./components/pages/suscriptions/suscriptions.component').then(
        (m) => m.SuscriptionsComponent
      ),
  },

  { path: '**', component: Error404Component }
];
