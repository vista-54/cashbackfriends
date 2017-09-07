import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../providers/user.service";
import {Loader} from "../../providers/loader";
import {Connect} from "../../providers/connect";
import {Message} from "../../providers/message";

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
    public searchQuery = '';
    private tmpCatalog = [];

    /**
     *
     * @param {NavController} navCtrl
     * @param {NavParams} navParams
     * @param {UserService} user
     * @param {Loader} loader
     * @param {Connect} connect
     * @param {Message} message
     */
    constructor(public navCtrl: NavController, public navParams: NavParams, user: UserService, private loader: Loader, private connect: Connect, private message: Message) {
        user.getCatalog().then((val) => {
            val.subscribe(data => {
                this.catalog = data.results;
                this.tmpCatalog = data.results;
            }, err => {
                this.loader.hide();
                if (!this.connect.isConnected) {
                    this.message.show('Ошибка сети', 'Подключение отсуствует');
                }
            })
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CatalogPage');
    }

    onInput() {
        this.catalog = this.tmpCatalog.filter(
            item => {
                let name = item.name.toLowerCase();
                let query = this.searchQuery.toLowerCase();
                return name.indexOf(query) !== -1
            }
        )
    }

    /**
     *
     * @param tag
     */
    public setTag(tag) {
        this.searchQuery = tag;
        this.onInput()
    }

}
