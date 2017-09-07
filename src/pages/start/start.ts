import {Component, ViewChild} from "@angular/core";
import {IonicPage, NavController, NavParams, Slides} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {StatusBar} from "@ionic-native/status-bar";

/**
 * Generated class for the StartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-start',
    templateUrl: 'start.html',
})

@IonicPage({
    name: 'start',
    segment: 'start'
})
export class StartPage {

    @ViewChild(Slides) slides: Slides;

    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,statusBar:StatusBar) {
        this.storage.set('isSliderShown', 'start');
        statusBar.backgroundColorByHexString('#1E69FF');
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad StartPage');
    }

    autoSlide() {
        let currentIndex = this.slides.getActiveIndex();
        currentIndex++;
        this.slides.slideTo(currentIndex);
    }


    public next() {
        this.navCtrl.push('login');
    }

}
