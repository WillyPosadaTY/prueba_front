import { Component, Inject, OnInit } from '@angular/core';
import { FLIGHT_SERVICE } from '../../app/services/flight/injection-token/injection-token';
import { IFlightService } from '../../app/services/flight/contract/flight-service.interface';
import { Flight } from './models/flight.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Journey } from './models/journey.model';

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
  selectJourney: Journey = {} as Journey;
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
          Validators.pattern('[a-zA-Z]+'),
          Validators.maxLength(3),
          Validators.minLength(3),
        ],
      ],
      destination: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z]+'),
          Validators.maxLength(3),
          Validators.minLength(3),
        ],
      ],
    });
  }

  getFlights() {
    this.flightService.getFlights().subscribe((res) => {
      res.forEach((flight) => {
        const flights: Flight = {
          destination: flight.arrivalStation,
          origin: flight.departureStation,
          transport: {
            flightCarrier: flight.flightCarrier,
            flightNumber: flight.flightNumber,
          },
          price: flight.price,
        };
        this.flights.push(flights);
      });
    });
  }

  public buildJourney() {
    this.clearJourney();
    this.clearFlight();
    const [flightOriginArray, flightDestinationArrayExist] = this.extractFlightArrays();
    if(flightDestinationArrayExist.length > 0){
      flightOriginArray.forEach((flightOrigin) => {
        const newJourney: Journey = {
          destination: this.searchFlightForm.controls['destination'].value.toUpperCase(),
          origin: flightOrigin.origin,
          price: flightOrigin.price,
          flights: this.buildFlights(
            flightOrigin,
            flightOrigin.destination
          ),
        };
        this.journey.push(newJourney);
      });
    }
    if(this.journey.length > 0){
      this.journey.map(journey => {
        if(Object.keys(this.selectJourney).length === 0 || this.selectJourney.flights.length > journey.flights.length){
          this.selectJourney = journey;
        }
      });
      this.selectJourney.price = this.calculatePrice(this.selectJourney.flights);
    }
  }
  extractFlightArrays():Flight[][]{
    const flightOriginArray = this.flights.filter(
      (flight) =>
        flight.origin === this.searchFlightForm.controls['origin'].value.toUpperCase()
    );
    
    const flightDestinationArrayExist = this.flights.filter(
      (flight) =>
        flight.origin === this.searchFlightForm.controls['destination'].value.toUpperCase() ||
        flight.destination === this.searchFlightForm.controls['destination'].value.toUpperCase() 
    );
    return [flightOriginArray, flightDestinationArrayExist];
  }
  calculatePrice(flights: Flight[]):number {
    let price = 0;
    if(flights.length > 0){
      flights.map(flight =>{
        price += flight.price;
      });
    }
    return price;
  }
  private clearFlight(){
    this.flightVisited = [];
    this.routeFlights = [];
    this.validatorFlights = [];
  }
  
  private clearJourney(){
    this.journey = [];
    this.selectJourney = {} as Journey;
  }
  private buildFlights(
    
    flight: Flight,
    destination: string
  ): Flight[] {
    this.clearFlight();
    this.recursiveRoutes(
      destination,
      flight,
      this.searchFlightForm.controls['origin'].value.toUpperCase()
    );
    return this.routeFlights;
  }
  recursiveRoutes(
    actualDestination: string,
    flight: Flight,
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
      let destinationArray = this.flights.filter(
        (flight) => flight.origin === actualDestination
      );
      this.flightVisited.push(flight);
      destinationArray.forEach((flight) => {
        this.recursiveRoutes(
          flight.destination,
          flight,
          flight.origin
        );
        if (this.routeFlights[0]) {
          this.tempFlights = this.flights.filter(
            (data) =>
              data.destination === this.routeFlights[this.routeFlights.length - 1].origin
          );
          this.tempFlights.forEach((element) => {
            if (element.destination === this.validatorFlights[this.validatorFlights.length - 1].origin && this.validatorFlights.length !== 0) {
              if (element.destination !== this.searchFlightForm.controls['origin'].value.toUpperCase()) {
                this.validatorFlights.push(element);
              }
            }
          });
          this.routeFlights = this.validatorFlights;
        }
      });
    }
    return;
  }
}
