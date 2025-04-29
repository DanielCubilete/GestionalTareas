import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private jsonURL = 'assets/data/subscriptions.json';

  constructor(private http: HttpClient) {}

  getSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.jsonURL);
  }
}
