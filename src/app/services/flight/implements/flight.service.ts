import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFlightService } from '../contract/flight-service.interface';
import { Observable } from 'rxjs';
import { Journey } from 'src/components/home/models/journey.model';
import { ResponseApi } from 'src/components/home/models/response.model';
import { Flight } from '../../../../components/home/models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class FlightService implements IFlightService {
  _api = 'https://recruiting-api.newshore.es/api/flights/2';

  constructor(private http: HttpClient) {
    console.log('servicio');
  }

  getFlights(): Observable<ResponseApi[]> {
    // this.http.get(this._api).subscribe((res) => {
    //   const flights: Response[] = res;

    // });
    return this.http.get<ResponseApi[]>(this._api);
  }
}
