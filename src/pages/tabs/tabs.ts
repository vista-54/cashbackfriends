import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MyCardPage} from "../my-card/my-card";
import {CatalogPage} from "../catalog/catalog";
import {InvitePage} from "../invite/invite";
import {Storage} from "@ionic/storage";
import {UserService} from "../../providers/user.service";
import {OperationsPage} from "../operations/operations";

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
    name: 'tabs',
    segment: 'tabs'
})

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
    providers: [UserService]
})
export class TabsPage {

    tab1Root = CatalogPage;
    tab2Root = MyCardPage;
    tab3Root = InvitePage;


    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private user: UserService) {
        storage.set('start_page', 'tabs');
        this.user.getInfo()
        // .subscribe(data => {
        //     localStorage.setItem('user', JSON.stringify(data));
        //     console.log(data);
        // })
    }

    ngOnInit() {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TabsPage');
    }

    openPage(page) {
        switch (page) {
            case 'catalog':
                this.navCtrl.push(CatalogPage);
                break;
            case 'card':
                this.navCtrl.push(MyCardPage);
                break;
            case 'invite':
                this.navCtrl.push(InvitePage);
                break;
            case 'operations':
                this.navCtrl.push(OperationsPage);
                break;
        }
    }
}
