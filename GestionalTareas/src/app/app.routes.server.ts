import { RenderMode, ServerRoute } from '@angular/ssr';
import { routes } from './app.routes'; // Importa las rutas principales


export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
