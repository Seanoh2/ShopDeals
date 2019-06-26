import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SettingsService } from '../settings.service';
var SettingsPage = /** @class */ (function () {
    function SettingsPage(storage, api) {
        this.storage = storage;
        this.api = api;
    }
    SettingsPage.prototype.ngOnInit = function () {
        this.getCurrencyList();
    };
    SettingsPage.prototype.getCurrencyList = function () {
        this.currencyList = this.api.currencyList;
    };
    SettingsPage.prototype.getRegion = function () {
        var _this = this;
        this.api.getRegion().then(function (val) {
            _this.region = val;
        });
    };
    SettingsPage.prototype.getCurrency = function () {
        var _this = this;
        this.api.getCountry().then(function (val) {
            _this.country = val;
        });
    };
    SettingsPage = tslib_1.__decorate([
        Component({
            selector: 'app-settings',
            templateUrl: './settings.page.html',
            styleUrls: ['./settings.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage,
            SettingsService])
    ], SettingsPage);
    return SettingsPage;
}());
export { SettingsPage };
//# sourceMappingURL=settings.page.js.map