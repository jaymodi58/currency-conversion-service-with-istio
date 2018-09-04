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

  endpoint = 'http://localhost:8000/currency-exchange/';

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getExchangeValue(from, to): Observable<any> {
    return this.httpClient.get(this.endpoint + 'from/' + from + '/to/' + to).pipe(
      map(this.extractData));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
