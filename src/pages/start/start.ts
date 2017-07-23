import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
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

    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
        storage.set('isSliderShown', true);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad StartPage');
    }

    public next() {
        this.navCtrl.push('login');
    }

}
