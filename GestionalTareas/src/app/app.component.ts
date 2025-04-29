import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mi-proyecto-angular';

  constructor(public router: Router) {}

  isDashboardRoute(): boolean {
    // Puedes ajustarlo si tienes subrutas, por ejemplo /user-dashboard/xyz
    return this.router.url.startsWith('/user-dashboard');
    return this.router.url.startsWith('/admin-dashboard');

  }
}
