import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SettingsService } from '../settings.service';
import { appInitialize } from '@ionic/angular/dist/app-initialize';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  region: boolean;
  country: string;
  currencyList: string[];

  constructor(private storage: Storage,
    public api: SettingsService) { }

  ngOnInit() {
    this.getCurrencyList();
  }

  getCurrencyList() {
    this.currencyList = this.api.currencyList;
  }

  getRegion() {
    this.api.getRegion().then((val) => {
      this.region = val;
    });
  }

  getCurrency() {
    this.api.getCountry().then((val) => {
      this.country = val;
    });
  }
}
