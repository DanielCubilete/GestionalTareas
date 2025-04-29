import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../../services/subscription.service';
import { Subscription } from '../../../models/subscription.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-suscriptions',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './suscriptions.component.html',
  styleUrls: ['./suscriptions.component.css']
})
export class SuscriptionsComponent implements OnInit {
  subscriptions: Subscription[] = [];

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.subscriptionService.getSubscriptions().subscribe(data => {
      this.subscriptions = data;
    });
  }
}
