import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConversionService {

  constructor(private httpClient: HttpClient) { }

  
  endpoint = 'http://currency-conversion-service:8100/currency-converter/';

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getCurrencyConversionValue(from, to, quantity): Observable<any> {
    return this.httpClient.get(this.endpoint + 'from/' + from + '/to/' + to + '/quantity/' + quantity).pipe(
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
