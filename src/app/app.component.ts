import { Component } from '@angular/core';
import { FlightService } from './services/flight/implements/flight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'prueba_front';

  constructor(private flight: FlightService) {
    

  }
}
