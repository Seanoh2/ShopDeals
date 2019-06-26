import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { reduce } from 'rxjs/operators';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { ObjectUnsubscribedError } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  foundItems: Array<any>;
  searchTerm: string = "";

  constructor(public api: RestApiService,
     public loadingController: LoadingController, 
     public storage: Storage) {
  }

  ngOnInit() {
  }

  jsonConversion(json){
    var result = [];
    var keys = Object.keys(json);
      keys.forEach(function(key){
      result.push(json[key]);
    });
  return result;
  }

  async getTitles() {
    const loading = await this.loadingController.create({
    });
    await loading.present();
    var keys = this.searchTerm.toLowerCase().split(" ");
    await this.api.getSteamNames(keys).subscribe(res => {   
      this.foundItems = this.setOverview(res);
      console.log(this.foundItems);
      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }

  getImage(steamLink){
    var url;
    if(steamLink != null) {
      url = "https://steamcdn-a.akamaihd.net/steam/apps/" + steamLink + "/capsule_184x69.jpg";
    } else {
      url = "assets/gallary-512.png"
    }
    return url;
  }

  setOverview(list) {
    let plains = Array<string>();
    let tempArray = Array<string>();
    tempArray = list;
    var temp = [];

    list.forEach(function(x) {
      plains.push('' + x.Plain);
    });

    this.api.getGamesOverview(plains).subscribe(res => {
      var overview = res["data"];
      
      tempArray.forEach(function(x) {
        let tempobject = overview[x["Plain"]];
        temp.push({AppID: x["AppID"],Name: x["Name"],Plain: x["Plain"],Overview: tempobject})
      });
    });
    console.log(temp);
    return temp;
  }
}
