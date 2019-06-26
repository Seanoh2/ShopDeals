import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  classrooms: Array<any>;
  appID: String;
  overlayHidden: boolean = false;
  priceSet = 0;

  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    private iab: InAppBrowser,
    public file: File,
    public alertController: AlertController) 
    { }
    
  ngOnInit() {
    this.getGames();
  }

  async getGames() {
    const loading = await this.loadingController.create({
    });
    await loading.present();
    await this.api.getGameByPlain(this.route.snapshot.paramMap.get('Plain'))
      .subscribe(res => {   
          this.classrooms = this.jsonConversion(res.data);
          console.log(this.classrooms)
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

  async presentPrompt() {
    const alert = this.alertController.create({
      header: 'Enter amount',
      inputs: [
        {
          name: 'Price',
          placeholder: ''
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Favorite',
          handler: data => {
            let title = "";
            this.api.getNameByPlain(this.route.snapshot.paramMap.get('Plain')).subscribe(res => {
              title = res["data"][this.route.snapshot.paramMap.get('Plain')].title;
            })
            let item = {
              "title" : title,
              "plain" : this.route.snapshot.paramMap.get('Plain'),
              "price" : data.Price,
              "appid" : this.route.snapshot.paramMap.get('ID'),
              "lowestFound" : 100.00,
              "priceFound" : false
            }
            this.api.getWishlist().subscribe(res => {   
              res.data.table.push(item);
              this.file.writeFile('../assets/data/wishlist.json', res, 'utf8');
            }, err => {
              console.log(err);
            });
          }
        }
      ]
    });
    await alert.then(val =>{
      val.present();
    });
  }

  openPage(URL: string) {
    const browser = this.iab.create(URL, '_blank', 'location=yes');
    browser.show();
  }

  getImage() {
    return "https://steamcdn-a.akamaihd.net/steam/apps/" + this.route.snapshot.paramMap.get('ID') + "/header.jpg?t=1533678449";
  }
}
