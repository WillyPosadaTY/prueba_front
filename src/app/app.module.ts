import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransportComponent } from '../components/transport/transport.component';
import { FlightComponent } from '../components/flight/flight.component';
import { JourneyComponent } from '../components/journey/journey.component';

@NgModule({
  declarations: [
    AppComponent,
    TransportComponent,
    FlightComponent,
    JourneyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
