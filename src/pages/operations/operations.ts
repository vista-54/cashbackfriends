import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {OperationsSettingsPage} from "../operations-settings/operations-settings";
import {UserService} from "../../providers/user.service";
import {OperationService} from "./operation.service";

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
     */
    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, user: UserService, model: OperationService) {
        this.storage.get('user').then(value => {
            this.currentUser = value;
            model.setCurrentUser(this.currentUser);
            this.balance = this.currentUser.cash_balance;
        });
        user.getPurchases().then((val) => {
            val.subscribe(data => {
                this.operationsList = this.operationsList.concat(model.transformOperationsArr(data));
                this.operationsList.sort(model.sortByDate)
            })
        });
        user.getWithdrawals().then((val) => {
            val.subscribe(data => {
                this.operationsList = this.operationsList.concat(model.transformOperationsArr(data));
                this.operationsList.sort(model.sortByDate)
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
