import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WishlistPage } from './wishlist.page';
var routes = [
    {
        path: '',
        component: WishlistPage
    }
];
var WishlistPageModule = /** @class */ (function () {
    function WishlistPageModule() {
    }
    WishlistPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [WishlistPage]
        })
    ], WishlistPageModule);
    return WishlistPageModule;
}());
export { WishlistPageModule };
//# sourceMappingURL=wishlist.module.js.map