import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
var apikey = "cafd8fd3344988673d1616988b9b4c7f2ad90ecc";
var apiUrl = "https://api.isthereanydeal.com/v01/";
var apiRDS = "https://ay81l29ipg.execute-api.eu-west-1.amazonaws.com/";
var apiRDSPlain = "https://fmprn4xj0e.execute-api.eu-west-1.amazonaws.com/";
var RestApiService = /** @class */ (function () {
    function RestApiService(http) {
        this.http = http;
    }
    RestApiService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        }
        else {
            console.error("Backend returned code " + error.status + ", " +
                ("body was: " + error.error));
        }
        return throwError('Something bad happened; please try again later.');
    };
    RestApiService.prototype.extractData = function (res) {
        var body = res;
        return body || {};
    };
    RestApiService.prototype.getGamesByPlains = function (plains) {
        var url = apiUrl + "game/prices/?key=" + apikey + "&plains=";
        for (var member in plains) {
            url += "%2";
            url += plains[member];
        }
        return this.http.get(url).pipe(map(this.extractData), catchError(this.handleError));
    };
    RestApiService.prototype.getGameByPlain = function (plain) {
        var url = apiUrl + "game/prices/?key=" + apikey + "&plains=" + plain;
        return this.http.get(url).pipe(map(this.extractData), catchError(this.handleError));
    };
    RestApiService.prototype.getPlainByID = function (ID) {
        var url = apiUrl + "game/plain/id/?key=" + apikey + "&shop=steam&ids=app%2F" + ID;
        return this.http.get(url).pipe(map(this.extractData), catchError(this.handleError));
    };
    RestApiService.prototype.getSteamNames = function (keys) {
        var url = apiRDS + "prod/Games?keys=";
        for (var i = 0; i < keys.length; i++) {
            url += keys[i];
            if (keys[i + 1] != null) {
                url += ",";
            }
        }
        return this.http.get(url).pipe(map(this.extractData), catchError(this.handleError));
    };
    RestApiService.prototype.getGamesOverview = function (keys) {
        var url = apiUrl + "game/overview/?key=" + apikey + "&region=eu1&country=EU&shop=steam&plains=";
        for (var i = 0; i < keys.length; i++) {
            url += keys[i];
            if (keys[i + 1] != null) {
                url += ",";
            }
        }
        return this.http.get(url).pipe(map(this.extractData), catchError(this.handleError));
    };
    RestApiService.prototype.getDeals = function (offset) {
        var url = apiUrl + "deals/list/?key=" + apikey + "&offset=" + offset + "&limit=20&region=eu2";
        return this.http.get(url).pipe(map(this.extractData), catchError(this.handleError));
    };
    RestApiService.prototype.getDealsID = function (plains) {
        var url = apiRDSPlain + "PROD?plains=";
        for (var i = 0; i < plains.length; i++) {
            url += plains[i];
            if (i != plains.length - 1) {
                url += ",";
            }
        }
        return this.http.get(url).pipe(map(this.extractData), catchError(this.handleError));
    };
    RestApiService.prototype.getWishlist = function () {
        var url = "assets/data/wishlist.json";
        return this.http.get(url).pipe(map(this.extractData), catchError(this.handleError));
    };
    RestApiService.prototype.getLowestPrices = function (plains) {
        var url = apiUrl + "game/overview/?key=" + apikey + "&plains=";
        for (var i = 0; i < plains.length; i++) {
            url += plains[i];
            if (i != plains.length - 1) {
                url += "%2C";
            }
        }
        return this.http.get(url).pipe(map(this.extractData), catchError(this.handleError));
    };
    RestApiService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], RestApiService);
    return RestApiService;
}());
export { RestApiService };
//# sourceMappingURL=rest-api.service.js.map