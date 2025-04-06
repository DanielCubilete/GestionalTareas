// app.config.server.ts

import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config'; // Asegúrate de que esta importación sea correcta
import { serverRoutes } from './app.routes.server'; // Si tienes configuraciones específicas para el servidor

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes)
  ]
};

// Aquí estamos combinando ambas configuraciones
export const config = mergeApplicationConfig(appConfig, serverConfig);
