import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  wishlist: Array<any>;
  lastChecked: String;

  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    public file: File) { }

  ngOnInit() {
    this.showWishlist();
  }

  async AddToWishlist(adding) {
    await this.api.getWishlist().subscribe(res => {   
      res.data.table.push(adding);
      this.file.writeFile('../assets/data/wishlist.json', res, 'utf8');
    }, err => {
      console.log(err);
    });
  }

  async RemoveFromWishlist(removing) {
    await this.api.getWishlist().subscribe(res => {   
      var key = removing["plain"];
      for(var i = 0; i < Object.keys(res.data).length; i++) {
      if(res.data[i].plain == key) {
        delete res.data[i];
        this.file.writeFile('../assets/data/wishlist.json', res, 'utf8');
        return "Complete";
      }
    }
    return "Incomplete";
    }, err => {
      console.log(err);
    });
  }

  async CheckWishList(refresher) {
    var date = new Date();
    await this.api.getWishlist().subscribe(res => {   
      var plains = [];
      for(var i = 0; i < res.data.length; i++) {
        plains.push(res.data[i].plain);
      }
      this.api.getLowestPrices(plains).subscribe(res2 => {
        for(var i = 0; i < Object.keys(res2.data).length; i++) {
          if(res2.data[plains[i]].price.price < res.data[i].price) {
            res.data[i].lowestFound = res2.data[plains[i]].price.price
            res.data[i].priceFound = true;
          }
        }
      })
      this.wishlist = res.data;
      res.meta.lastChecked = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      this.lastChecked = res.meta.lastChecked;
      this.file.writeFile('../assets/data/wishlist.json', res, 'utf8');
    }, err => {
      console.log(err);
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.target.complete();
    }, 2000);
  }

  async showWishlist() {
    await this.api.getWishlist().subscribe(res => {
      this.wishlist = res.data;
    });
  }
}
