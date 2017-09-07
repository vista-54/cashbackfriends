import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MyCardPage} from "../my-card/my-card";
import {CatalogPage} from "../catalog/catalog";
import {InvitePage} from "../invite/invite";
import {Storage} from "@ionic/storage";
import {UserService} from "../../providers/user.service";
import {OperationsPage} from "../operations/operations";
import {Loader} from "../../providers/loader";
import {Message} from "../../providers/message";
import {Connect} from "../../providers/connect";

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


    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private user: UserService, private loader: Loader, private message: Message, private connect: Connect) {
        storage.set('start_page', 'tabs');
        this.user.getInfo().then(val => {
            val.subscribe(data => {
                this.storage.set('user', data);
            }, err => {
                loader.hide();
                if (!this.connect.isConnected) {
                    this.message.show('Ошибка сети', 'Подключение отсуствует');
                }
            })
        })
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
