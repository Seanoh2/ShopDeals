import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  currencyList: string[];

  constructor(private storage: Storage) { }

  setRegion(region) {
    this.storage.ready().then((val) => {
      this.storage.set("region", region);
    });
  }

  setCountry(country) {
    this.storage.ready().then((val) => {
      this.storage.set("country", country);
    });
  }

  getRegion() {
      return this.storage.get("region").then((val) => {
        return val;
      });
  }
  
  getCountry() {
      return this.storage.get("country").then((val) => {
        return val;
      });
  }
}
