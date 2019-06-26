import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
var ListPage = /** @class */ (function () {
    function ListPage(api, loadingController, storage) {
        this.api = api;
        this.loadingController = loadingController;
        this.storage = storage;
        this.searchTerm = "";
    }
    ListPage.prototype.ngOnInit = function () {
    };
    ListPage.prototype.jsonConversion = function (json) {
        var result = [];
        var keys = Object.keys(json);
        keys.forEach(function (key) {
            result.push(json[key]);
        });
        return result;
    };
    ListPage.prototype.getTitles = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, keys;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({})];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        keys = this.searchTerm.toLowerCase().split(" ");
                        return [4 /*yield*/, this.api.getSteamNames(keys).subscribe(function (res) {
                                _this.foundItems = _this.setOverview(res);
                                console.log(_this.foundItems);
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
    ListPage.prototype.getImage = function (steamLink) {
        var url;
        if (steamLink != null) {
            url = "https://steamcdn-a.akamaihd.net/steam/apps/" + steamLink + "/capsule_184x69.jpg";
        }
        else {
            url = "assets/gallary-512.png";
        }
        return url;
    };
    ListPage.prototype.setOverview = function (list) {
        var plains = Array();
        var tempArray = Array();
        tempArray = list;
        var temp = [];
        list.forEach(function (x) {
            plains.push('' + x.Plain);
        });
        this.api.getGamesOverview(plains).subscribe(function (res) {
            var overview = res["data"];
            tempArray.forEach(function (x) {
                var tempobject = overview[x["Plain"]];
                temp.push({ AppID: x["AppID"], Name: x["Name"], Plain: x["Plain"], Overview: tempobject });
            });
        });
        console.log(temp);
        return temp;
    };
    ListPage = tslib_1.__decorate([
        Component({
            selector: 'app-list',
            templateUrl: 'list.page.html',
            styleUrls: ['list.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [RestApiService,
            LoadingController,
            Storage])
    ], ListPage);
    return ListPage;
}());
export { ListPage };
//# sourceMappingURL=list.page.js.map