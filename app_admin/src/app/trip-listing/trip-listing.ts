import { Component, OnInit , ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card';
import { Authentication } from '../services/authentication';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data';
import {Router} from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  template: `Number of ticks: {{ numberOfTicks }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TripDataService]
})

export class TripListing implements OnInit {
  trips!: Trip[];
  message:string='';
  numberOfTicks = 0;
  constructor(private tripDataService: TripDataService,
    private ref: ChangeDetectorRef,
    private router:Router,
    private authenticationService: Authentication
    
  ) {
    console.log('trip-listing constructor');
    setInterval(() => {
      this.numberOfTicks++;
      // require view to be updated
      this.ref.markForCheck();
    }, 
    1000);
  }
  public addTrip():void{
    this.router.navigate(['add-trip']);
  }
  private getStuff(): void {
    this.tripDataService.getTrips()
      .subscribe({

        next: (value: any) => {
          this.trips = value;
          if (value.length > 0) {
            this.message = 'There are ' + value.length + ' trips available.';
          }
          else {
            this.message = 'There were no trips retireved from the database';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
    
  }
  public isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }
}
