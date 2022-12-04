import { Observable } from 'rxjs';
import { ResponseApi } from 'src/components/home/models/response.model';

export interface IFlightService {
  getFlights() :Observable<ResponseApi[]>;
}
