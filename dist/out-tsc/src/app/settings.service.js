import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
var SettingsService = /** @class */ (function () {
    function SettingsService(storage) {
        this.storage = storage;
    }
    SettingsService.prototype.setRegion = function (region) {
        var _this = this;
        this.storage.ready().then(function (val) {
            _this.storage.set("region", region);
        });
    };
    SettingsService.prototype.setCountry = function (country) {
        var _this = this;
        this.storage.ready().then(function (val) {
            _this.storage.set("country", country);
        });
    };
    SettingsService.prototype.getRegion = function () {
        return this.storage.get("region").then(function (val) {
            return val;
        });
    };
    SettingsService.prototype.getCountry = function () {
        return this.storage.get("country").then(function (val) {
            return val;
        });
    };
    SettingsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage])
    ], SettingsService);
    return SettingsService;
}());
export { SettingsService };
//# sourceMappingURL=settings.service.js.map