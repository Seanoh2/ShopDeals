import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
var HomePage = /** @class */ (function () {
    function HomePage(api, loadingController, route, router, iab) {
        this.api = api;
        this.loadingController = loadingController;
        this.route = route;
        this.router = router;
        this.iab = iab;
        this.offset = 0;
    }
    HomePage.prototype.ngOnInit = function () {
        this.gameDeals = [];
        this.getDeals();
    };
    HomePage.prototype.getDeals = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({})];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.api.getDeals(this.offset).subscribe(function (res) {
                                _this.gameDeals = _this.gameDeals.concat(_this.jsonConversion(res["data"]["list"]));
                                loading.dismiss();
                            }, function (err) {
                                console.log(err);
                                loading.dismiss();
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.jsonConversion = function (json) {
        var result = [];
        var keys = Object.keys(json);
        keys.forEach(function (key) {
            result.push(json[key]);
        });
        return result;
    };
    HomePage.prototype.loadMore = function (infiniteScroll) {
        this.offset += 20;
        this.getDeals();
        infiniteScroll.target.complete();
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [RestApiService,
            LoadingController,
            ActivatedRoute,
            Router,
            InAppBrowser])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map