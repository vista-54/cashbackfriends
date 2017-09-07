import {Component, ViewChild} from "@angular/core";
import {IonicPage, NavController, NavParams, Slides} from "ionic-angular";
import {Storage} from "@ionic/storage";

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

    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
        this.storage.set('isSliderShown', 'start');

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
