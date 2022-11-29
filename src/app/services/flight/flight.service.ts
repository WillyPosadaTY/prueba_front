import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  _api = 'https://recruiting-api.newshore.es/api/flights/0';
  constructor(private http: HttpClient) {
    console.log('servicio');
  }

  getFlights() {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');

    return this.http.get(this._api, { headers: header });
  }
}
