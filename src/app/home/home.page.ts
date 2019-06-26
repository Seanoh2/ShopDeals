import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  gameDeals: any[];
  offset = 0;

  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    private iab: InAppBrowser) { 
    }
    

  ngOnInit() {
    this.gameDeals = [];
    this.getDeals();
  }

  async getDeals() {
    const loading = await this.loadingController.create({
    });
    await loading.present();
    await this.api.getDeals(this.offset).subscribe(res => {
        this.gameDeals = this.gameDeals.concat(this.jsonConversion(res["data"]["list"]));
        console.log(this.gameDeals)
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
    }

    jsonConversion(json){
      var result = [];
      var keys = Object.keys(json);
        keys.forEach(function(key){
        result.push(json[key]);
      });
    return result;
    }

    loadMore(infiniteScroll) {
      this.offset += 20;
      this.getDeals();
      infiniteScroll.target.complete();
    }

    openPage(URL: string) {
      const browser = this.iab.create(URL, '_blank', 'location=yes');
      browser.show();
    }
}
