import { InjectionToken } from "@angular/core";
import { IFlightService } from '../contract/flight-service.interface';
import { FlightService } from "../implements/flight.service";

export const FLIGHT_SERVICE = new InjectionToken<IFlightService>('FlightService');
export const flightProvider = [{provide: FLIGHT_SERVICE, useClass: FlightService}];