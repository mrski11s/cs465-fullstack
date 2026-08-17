import { Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip';
import { TripListing } from './trip-listing/trip-listing';
import { EditTripComponent } from './edit-trip/edit-trip';
import { TripCardComponent } from './trip-card/trip-card';
import { Login } from './login/login';
export const routes: Routes = [
    {path:'',component:TripListing,pathMatch:'full'},
    {path:'trip-card',component:TripCardComponent},
    {path:'add-trip',component:AddTripComponent},
    {path:'edit-trip',component:EditTripComponent},
    {path:'login',component:Login},
    
];
