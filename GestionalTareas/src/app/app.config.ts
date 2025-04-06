// config.ts
import { provideRouter, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { routes } from './app.routes';  // Tu archivo de rutas

// Aquí declaras los componentes que usarás en tu aplicación
export const appComponents = [
  HeaderComponent,
  FooterComponent
];

// Aquí configuras el RouterModule
export const appRouting = RouterModule.forRoot(routes);

// Luego puedes configurar y usar `appComponents` donde lo necesites en tu aplicación
// app.config.ts

// Aquí deberías definir y exportar appConfig
export const appConfig = {
  providers: [
    provideRouter(routes),
    
  ]  // La propiedad "providers" es obligatoria para ApplicationConfig
};
