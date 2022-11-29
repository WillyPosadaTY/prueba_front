import { Component } from '@angular/core';
import { FlightService } from './services/flight/flight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'prueba_front';

  constructor(private flight: FlightService) {
    this.flight.getFlights().subscribe(resp=>{
      console.log(resp);
    })

  }
}
