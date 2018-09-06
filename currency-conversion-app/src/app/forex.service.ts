import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForexService {

  constructor(private httpClient: HttpClient) {

  }

  endpoint = 'http://forex-service:8000/currency-exchange/';

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getExchangeValue(from, to): Observable<any> {
    return this.httpClient.get(this.endpoint + 'from/' + from + '/to/' + to).pipe(
      map(this.extractData));
  }
}
