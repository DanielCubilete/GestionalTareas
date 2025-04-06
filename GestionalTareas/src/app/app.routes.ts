// app.routes.ts

import { HomeComponent } from './components/pages/home/home.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { ContactUsComponent } from './components/pages/contact-us/contact-us.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DefaultComponent } from './components/pages/default/default.component';
import { RouterLink } from '@angular/router';
import { AdminDashboardComponent } from './components/appweb/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/appweb/user-dashboard/user-dashboard.component';
// Asegúrate de que estas rutas estén bien definidas
export const routes = [
  { path: '', component: DefaultComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'default', component: DefaultComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent},
  {path: 'user-dashboard', component: UserDashboardComponent}
];
