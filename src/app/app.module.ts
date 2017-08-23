import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {IonicStorageModule} from "@ionic/storage";

import {TextMaskModule} from "angular2-text-mask"

import {MyApp} from "./app.component";
import {HttpModule} from "@angular/http";
import {MyCardPage} from "../pages/my-card/my-card";
import {CatalogPage} from "../pages/catalog/catalog";
import {InvitePage} from "../pages/invite/invite";
import {OperationsPage} from "../pages/operations/operations";
import {OperationsSettingsPage} from "../pages/operations-settings/operations-settings";
import {SocialSharing} from "@ionic-native/social-sharing";


@NgModule({
    declarations: [
        MyApp,
        CatalogPage,
        MyCardPage,
        InvitePage,
        OperationsPage,
        OperationsSettingsPage

    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            tabsPlacement: 'bottom',
            pageTransition: 'ios-transition',
            backButtonText: 'Назад',
            statusbarPadding: false
        }),
        IonicStorageModule.forRoot(),
        HttpModule,
        TextMaskModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        CatalogPage,
        MyCardPage,
        InvitePage,
        OperationsPage,
        OperationsSettingsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        SocialSharing,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {

}
