import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { headersToString } from 'selenium-webdriver/http';
import { AngularDelegate } from '@ionic/angular';
import { PlayOptions } from '@ionic/core';

const apikey = "cafd8fd3344988673d1616988b9b4c7f2ad90ecc";
const apiUrl = "https://api.isthereanydeal.com/v01/";
const apiRDS = "https://ay81l29ipg.execute-api.eu-west-1.amazonaws.com/"
const apiRDSPlain = "https://fmprn4xj0e.execute-api.eu-west-1.amazonaws.com/"

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) {
   }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }  
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getGamesByPlains(plains:string[]): Observable<any> {
    let url = apiUrl + "game/prices/?key=" + apikey + "&plains="
    for (var member in plains) {
      url += "%2";
      url += plains[member];
    }
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getGameByPlain(plain): Observable<any> {
    let url = apiUrl + "game/prices/?key=" + apikey + "&plains=" + plain;
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getPlainByID(ID): Observable<any> {
    let url = apiUrl + "game/plain/id/?key=" + apikey + "&shop=steam&ids=app%2F" + ID;
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getSteamNames(keys: String[]): Observable<any> {
    let url = apiRDS + "prod/Games?keys=";
		for(var i = 0; i < keys.length; i++){
      url += keys[i];
      if(keys[i+1] != null) {
        url += ","
      }
    }
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError))
  }

  getGamesOverview(keys: string[]) {
    let url = apiUrl + "game/overview/?key=" + apikey + "&region=eu1&country=EU&shop=steam&plains="
    for(var i = 0; i < keys.length; i++){
      url += keys[i];
      if(keys[i+1] != null) {
        url += ","
      }
    }
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError))
  }

  getDeals(offset): Observable<any> {
    let url = apiUrl + "deals/list/?key=" + apikey + "&offset=" + offset + "&limit=20&region=eu2";
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError))
  }

  getDealsID(plains: string[]): Observable<any> {
    let url = apiRDSPlain + "PROD?plains="
    for(var i = 0; i < plains.length; i++) {
      url += plains[i];
      if(i != plains.length - 1) {
        url += ",";
      }
    }
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError))
   }

  getWishlist(): Observable<any> {
    let url = "assets/data/wishlist.json";
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getLowestPrices(plains: any[]): Observable<any> {
    let url = apiUrl + "game/overview/?key=" + apikey + "&plains=";
    for(var i = 0; i < plains.length; i++) {
      url += plains[i];
      if(i != plains.length - 1) {
        url += "%2C";
      }
    }
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError)); 
  }

  getNameByPlain(plain) {
    let url = apiUrl + "game/info/?key=" + apikey + "&plains=" + plain;
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError)); 
  }
}

