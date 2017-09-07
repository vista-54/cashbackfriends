import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {OperationsSettingsPage} from "../operations-settings/operations-settings";
import {UserService} from "../../providers/user.service";
import {OperationService} from "./operation.service";
import {Loader} from "../../providers/loader";
import {Message} from "../../providers/message";
import {Connect} from "../../providers/connect";

/**
 * Generated class for the OperationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-operations',
    templateUrl: 'operations.html',
    providers: [UserService, OperationService]
})
export class OperationsPage {
    public balance: string;
    public operationsList = [];
    private currentUser;

    /**
     *
     * @param {NavController} navCtrl
     * @param {NavParams} navParams
     * @param {Storage} storage
     * @param {UserService} user
     * @param {OperationService} model
     * @param {Loader} loader
     * @param {Message} message
     * @param {Connect} connect
     */

    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, user: UserService, model: OperationService, private loader: Loader, private message: Message, private connect: Connect) {
        this.storage.get('user').then(value => {
            this.currentUser = value;
            model.setCurrentUser(this.currentUser);
            this.balance = this.currentUser.cash_balance;
        });
        if (!this.connect.isConnected) {
            this.message.show('Ошибка сети', 'Подключение отсуствует');
        }
        user.getPurchases().then((val) => {
            val.subscribe(data => {
                this.operationsList = this.operationsList.concat(model.transformOperationsArr(data));
                this.operationsList.sort(model.sortByDate)
            }, err => {
                this.loader.hide();

            })
        });
        user.getWithdrawals().then((val) => {
            val.subscribe(data => {
                this.operationsList = this.operationsList.concat(model.transformOperationsArr(data));
                this.operationsList.sort(model.sortByDate)
            }, err => {
                this.loader.hide();
            })
        });
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad OperationsPage');
    }

    /**
     *
     * @param page
     */
    public openPage(page) {
        switch (page) {
            case 'operations-setting':
                this.navCtrl.push(OperationsSettingsPage);
                break;
        }
    }

}
