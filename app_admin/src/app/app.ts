import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './navbar/navbar';
@Component({
  selector: 'app-root',
  standalone:true,
  imports: [CommonModule,RouterOutlet,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
  template: `Number of ticks: {{ numberOfTicks }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  numberOfTicks = 0;
  title = 'Travlr Getaways Admin!';
  constructor(
    private ref: ChangeDetectorRef,
    
  ) { 
    setInterval(() => {
      this.numberOfTicks++;
      // require view to be updated
      this.ref.markForCheck();
    }, 
    1000);
  }
}
