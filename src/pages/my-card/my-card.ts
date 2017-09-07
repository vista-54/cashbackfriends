import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {QRCode, QRNumber} from 'qrcode-generator-ts/js';
import {Storage} from "@ionic/storage";
import {InvitePage} from "../invite/invite";
import {OperationsPage} from "../operations/operations";
import {OperationsSettingsPage} from "../operations-settings/operations-settings";

/**
 * Generated class for the MyCardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-my-card',
    templateUrl: 'my-card.html',
})
export class MyCardPage {

    public qrCode: string;
    public imageLink;
    public balance: string;
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    /**
     *
     * @param {NavController} navCtrl
     * @param {NavParams} navParams
     * @param {Storage} storage
     */
    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
        this.storage.get('user').then(value => {
            this.balance = value.cash_balance;
            let qr = new QRCode();
            this.qrCode = value.code;
            qr.addData(new QRNumber(value.code));
            qr.make();
            this.imageLink = qr.toDataURL(20, 20);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyCardPage');
    }

    canv() {
        this.canvas = <HTMLCanvasElement>document.getElementById('cnvs');
        this.ctx = this.canvas.getContext("2d");
        this.ctx.fillStyle = "#00FF00";
        this.ctx.fillRect(0, 0, 100, 100);
    }

    public openPage(page) {
        switch (page) {
            case 'invite':
                this.navCtrl.push(InvitePage);
                break;
            case 'operations':
                this.navCtrl.push(OperationsPage);
                break;
            case 'operations-setting':
                this.navCtrl.push(OperationsSettingsPage);
                break;
        }
    }

}
