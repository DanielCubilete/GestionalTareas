import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// ❌ No importes ni declares SuscriptionsComponent aquí

@NgModule({
  declarations: [
    // SuscriptionsComponent ❌ esto fuera
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class PagesModule {}
