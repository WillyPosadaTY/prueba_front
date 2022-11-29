import { Component, Inject, OnInit } from '@angular/core';
import { FLIGHT_SERVICE } from '../../app/services/flight/injection-token/injection-token';
import { IFlightService } from '../../app/services/flight/contract/flight-service.interface';
import { ResponseApi } from './models/response.model';
import { Flight } from './models/flight.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  flights: Flight[] = [];
  constructor(
    @Inject(FLIGHT_SERVICE) protected flightService: IFlightService
  ) {}
  ngOnInit(): void {
    this.getFlights();
  }

  getFlights() {
    this.flightService.getFlights().subscribe((res) => {
      res.forEach((fl) => {
        const flight: Flight = {
          destination: fl.arrivalStation,
          origin: fl.departureStation,
          transport: {
            flightCarrier: fl.flightCarrier,
            flightNumber: fl.flightNumber,
          },
          price: fl.price,
        };
        this.flights.push(flight);
      });
    });
  }
  getRoutes(origin: string, destination: string) {
    

  }
}
