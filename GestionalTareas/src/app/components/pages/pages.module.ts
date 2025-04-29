import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SuscriptionsComponent } from '../../components/pages/suscriptions/suscriptions.component';

@NgModule({
  declarations: [
    SuscriptionsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class PagesModule {}
