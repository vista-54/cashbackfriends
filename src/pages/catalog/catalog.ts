import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../providers/user.service";

/**
 * Generated class for the CatalogPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-catalog',
    templateUrl: 'catalog.html',
    providers: [UserService]
})
export class CatalogPage {

    public catalog = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, user: UserService) {
        user.getCatalog().then((val) => {
            val.subscribe(data => {
                this.catalog = data.results;
            })
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CatalogPage');
    }

    onInput(t) {
        console.log(t)
    }

}
