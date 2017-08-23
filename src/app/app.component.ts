import {Component} from "@angular/core";
import {Platform} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Storage} from "@ionic/storage";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    rootPage: string;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.overlaysWebView(false);
            statusBar.backgroundColorByHexString('#1E69FF');
            splashScreen.hide();
        });


        storage.get('start_page').then((val) => {
            if (val) {
                this.rootPage = val;
            } else {
                this.rootPage = 'start';
            }
        });
    }


}

