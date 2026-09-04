import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication';
@Component({
  selector: 'app-trip-card',
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
  template: `Number of ticks: {{ numberOfTicks }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripCardComponent implements OnInit {
  numberOfTicks = 0;
  @Input('trip') trip: any;
  constructor(
    private router: Router,
    private ref: ChangeDetectorRef,
    private authenticationService: Authentication

  ) {
    setInterval(() => {
      this.numberOfTicks++;
      // require view to be updated
      this.ref.markForCheck();
    },
      1000);
  }
  ngOnInit(): void {

  }
  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }
  
  public isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

}
