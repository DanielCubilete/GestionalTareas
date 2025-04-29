
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { SubscriptionService } from '../../../services/subscription.service';
// import { Subscription } from '../../../models/subscription.model';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-suscriptions',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule],
//   templateUrl: './suscriptions.component.html',
//   styleUrls: ['./suscriptions.component.css']
// })
// export class SuscriptionsComponent implements OnInit {
//   subscriptions: Subscription[] = [];

//   constructor(private subscriptionService: SubscriptionService) {}

//   ngOnInit(): void {
//     this.subscriptionService.getSubscriptions().subscribe(data => {
//       this.subscriptions = data;
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../servicios/data.service';
import { interfaz } from '../../../common/interfaz';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-suscriptions',
  standalone: true,
  imports: [],
  templateUrl: './suscriptions.component.html',
  styleUrl: './suscriptions.component.css'
})



export class SuscriptionsComponent implements OnInit {

  constructor(private dataservice: DataService){}


  suscriptionObjeto!: interfaz;


   ngOnInit(): void {
    this.loadModeloSuscripciones();
   }



  loadModeloSuscripciones() {

    this.dataservice.getModeloPago().subscribe(
    {
      next: (data)=>{
        this.suscriptionObjeto = data;
        console.log(this.suscriptionObjeto
        );
      },

      error: err =>{
        console.log(err)
      },

      complete: () => {
        console.log('Peticion completada')
      }
    }
    );
  }


}
