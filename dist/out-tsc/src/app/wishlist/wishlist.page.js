import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { File } from '@ionic-native/file/ngx';
var WishlistPage = /** @class */ (function () {
    function WishlistPage(api, loadingController, file) {
        this.api = api;
        this.loadingController = loadingController;
        this.file = file;
    }
    WishlistPage.prototype.ngOnInit = function () {
        this.showWishlist();
    };
    WishlistPage.prototype.AddToWishlist = function (adding) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.getWishlist().subscribe(function (res) {
                            res.data.table.push(adding);
                            _this.file.writeFile('../assets/data/wishlist.json', res, 'utf8');
                        }, function (err) {
                            console.log(err);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WishlistPage.prototype.RemoveFromWishlist = function (removing) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.getWishlist().subscribe(function (res) {
                            var key = removing["plain"];
                            for (var i = 0; i < Object.keys(res.data).length; i++) {
                                if (res.data[i].plain == key) {
                                    delete res.data[i];
                                    _this.file.writeFile('../assets/data/wishlist.json', res, 'utf8');
                                    return "Complete";
                                }
                            }
                            return "Incomplete";
                        }, function (err) {
                            console.log(err);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WishlistPage.prototype.CheckWishList = function (refresher) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var date;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date();
                        return [4 /*yield*/, this.api.getWishlist().subscribe(function (res) {
                                var plains = [];
                                for (var i = 0; i < res.data.length; i++) {
                                    plains.push(res.data[i].plain);
                                }
                                _this.api.getLowestPrices(plains).subscribe(function (res2) {
                                    for (var i = 0; i < Object.keys(res2.data).length; i++) {
                                        if (res2.data[plains[i]].price.price < res.data[i].price) {
                                            res.data[i].lowestFound = res2.data[plains[i]].price.price;
                                            res.data[i].priceFound = true;
                                        }
                                    }
                                });
                                _this.wishlist = res.data;
                                res.meta.lastChecked = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
                                _this.lastChecked = res.meta.lastChecked;
                                _this.file.writeFile('../assets/data/wishlist.json', res, 'utf8');
                            }, function (err) {
                                console.log(err);
                            })];
                    case 1:
                        _a.sent();
                        setTimeout(function () {
                            console.log('Async operation has ended');
                            refresher.target.complete();
                        }, 2000);
                        return [2 /*return*/];
                }
            });
        });
    };
    WishlistPage.prototype.showWishlist = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.getWishlist().subscribe(function (res) {
                            _this.wishlist = res.data;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WishlistPage = tslib_1.__decorate([
        Component({
            selector: 'app-wishlist',
            templateUrl: './wishlist.page.html',
            styleUrls: ['./wishlist.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [RestApiService,
            LoadingController,
            File])
    ], WishlistPage);
    return WishlistPage;
}());
export { WishlistPage };
//# sourceMappingURL=wishlist.page.js.map