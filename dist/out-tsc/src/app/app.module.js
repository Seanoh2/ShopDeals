import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [AppComponent],
            entryComponents: [],
            imports: [
                CommonModule,
                BrowserModule,
                IonicModule.forRoot(),
                AppRoutingModule,
                HttpClientModule,
                AlertController,
                IonicStorageModule.forRoot(),
            ],
            providers: [
                StatusBar,
                SplashScreen,
                File,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
                InAppBrowser
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map