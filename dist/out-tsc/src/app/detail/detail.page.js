import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { AlertController } from '@ionic/angular';
var DetailPage = /** @class */ (function () {
    function DetailPage(api, loadingController, route, router, iab, file, alertController) {
        this.api = api;
        this.loadingController = loadingController;
        this.route = route;
        this.router = router;
        this.iab = iab;
        this.file = file;
        this.alertController = alertController;
        this.overlayHidden = false;
        this.priceSet = 0;
    }
    DetailPage.prototype.ngOnInit = function () {
        this.getGames();
    };
    DetailPage.prototype.getGames = function () {
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
                        return [4 /*yield*/, this.api.getGameByPlain(this.route.snapshot.paramMap.get('Plain'))
                                .subscribe(function (res) {
                                _this.classrooms = _this.jsonConversion(res.data);
                                console.log(_this.classrooms);
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
    DetailPage.prototype.presentPrompt = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        alert = this.alertController.create({
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
                                    handler: function (data) {
                                        console.log('Cancel clicked');
                                    }
                                },
                                {
                                    text: 'Favorite',
                                    handler: function (data) {
                                    }
                                }
                            ]
                        });
                        return [4 /*yield*/, alert.then(this.presentPrompt)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailPage.prototype.jsonConversion = function (json) {
        var result = [];
        var keys = Object.keys(json);
        keys.forEach(function (key) {
            result.push(json[key]);
        });
        return result;
    };
    DetailPage.prototype.openPage = function (URL) {
        var browser = this.iab.create(URL, '_blank', 'location=yes');
        browser.show();
    };
    DetailPage.prototype.getImage = function () {
        return "https://steamcdn-a.akamaihd.net/steam/apps/" + this.route.snapshot.paramMap.get('ID') + "/header.jpg?t=1533678449";
    };
    DetailPage = tslib_1.__decorate([
        Component({
            selector: 'app-detail',
            templateUrl: './detail.page.html',
            styleUrls: ['./detail.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [RestApiService,
            LoadingController,
            ActivatedRoute,
            Router,
            InAppBrowser,
            File,
            AlertController])
    ], DetailPage);
    return DetailPage;
}());
export { DetailPage };
//# sourceMappingURL=detail.page.js.map