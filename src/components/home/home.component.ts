import { Component, Inject, OnInit } from '@angular/core';
import { FLIGHT_SERVICE } from '../../app/services/flight/injection-token/injection-token';
import { IFlightService } from '../../app/services/flight/contract/flight-service.interface';
import { Flight } from './models/flight.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Journey } from './models/journey.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  flights: Flight[] = [];
  searchFlightForm!: FormGroup;
  routeFlights: Array<Flight> = [];
  flightVisited: Array<Flight> = [];
  tempFlights: Array<Flight> = [];
  validatorFlights: Array<Flight> = [];
  nodesVisited: Array<Flight> = [];
  journey: Journey[] = [];
  constructor(
    @Inject(FLIGHT_SERVICE) protected flightService: IFlightService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getFlights();
    this.buildForm();
  }

  buildForm() {
    this.searchFlightForm = this.fb.group({
      origin: [
        '',
        [
          Validators.required,
          Validators.pattern('/^[a-zA-Z]+$/'),
          Validators.maxLength(3),
        ],
      ],
      destination: [
        '',
        [
          Validators.required,
          Validators.pattern('/^[a-zA-Z]+$/'),
          Validators.maxLength(3),
        ],
      ],
    });
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
    //console.log(this.flights);
  }

  calculatePrice(arr: Flight[]) {
    var minPrice: number = 5000;
    var maxPrice: number = 0;
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j].price;
      if (element <= minPrice) {
        minPrice = element;
      }
      if (element >= maxPrice) {
        maxPrice = element;
      }
    }
  }

  public buildJourney() {
    const flightOriginArray = this.flights.filter(
      (flight) =>
        flight.origin ===
        this.searchFlightForm.controls['origin'].value.toUpperCase()
    );
    flightOriginArray.forEach((flightOrigin) => {
      const newJourney: Journey = {
        destination: flightOrigin.destination,
        origin: flightOrigin.origin,
        price: flightOrigin.price,
        flights: this.buildFlights(
          flightOrigin.origin,
          flightOrigin,
          flightOrigin.destination
        ),
      };

      this.journey.push(newJourney);
    });
  }

  private buildFlights(
    origin: string,
    flight: Flight,
    destination: string
  ): Flight[] {
    this.flightVisited = [];
    this.routeFlights = [];
    this.validatorFlights = [];
    this.recursiveRoutes(destination, flight, this.tempFlights, this.searchFlightForm.controls['origin'].value.toUpperCase());
    console.log('..............');
    console.log(this.routeFlights);
    //console.log(this.validatorFlights);
    return this.routeFlights;
  }
  recursiveRoutes(
    actualDestination: string,
    flight: Flight,
    tempFlight: Flight[],
    origin: string
  ) {
    if (actualDestination === this.searchFlightForm.controls['destination'].value.toUpperCase() && origin === this.searchFlightForm.controls['origin'].value.toUpperCase()) {
      this.routeFlights.push(flight);
      this.validatorFlights.push(flight);
      return this.routeFlights;
    }
    if (actualDestination === this.searchFlightForm.controls['destination'].value.toUpperCase()) {
      this.routeFlights.push(flight);
      this.validatorFlights.push(flight);
      return this.routeFlights;
    }
    if (!this.flightVisited.find((visited) => visited.destination === actualDestination)) {
      let destinationArray = this.flights.filter((flight) => flight.origin === actualDestination);
      this.flightVisited.push(flight);
      destinationArray.forEach((flight) => {
        this.recursiveRoutes(flight.destination, flight, this.tempFlights, flight.origin);
        if (this.routeFlights[0]) {
          this.tempFlights = this.flights.filter((data) =>
              data.destination === this.routeFlights[this.routeFlights.length - 1].origin
          );
          this.tempFlights.forEach((element) => {
              if (
                element.destination ===
                this.validatorFlights[this.validatorFlights.length - 1].origin
                && this.validatorFlights.length !== 0
              ) {
                if(element.destination !== this.searchFlightForm.controls['origin'].value.toUpperCase()){
                this.validatorFlights.push(element);
              }
              }
          });
          this.routeFlights = this.validatorFlights;
          // console.log(this.tempFlights);
          // console.log('............');
          // console.log(this.routeFlights);
          // console.log('--------------');
        }
      });
    }
    return;
  }
}
