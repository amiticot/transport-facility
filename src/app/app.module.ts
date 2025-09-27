import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddRideComponent } from './transport-management/add-ride/add-ride.component';
import { RideListComponent } from './transport-management/ride-list/ride-list.component';
import { BookRideComponent } from './transport-management/book-ride/book-ride.component';

@NgModule({
  declarations: [
    AppComponent,
    AddRideComponent,
    RideListComponent,
    BookRideComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
