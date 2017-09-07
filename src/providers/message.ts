import {AlertController} from "ionic-angular";
import {Injectable} from "@angular/core";

@Injectable()

export class Message {
    private message: any;

    constructor(private alertCtrl: AlertController) {

    }

    public show(title, subtitle, buttons = null) {
        let defaultButtons = ['OK'];
        this.message = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: defaultButtons || buttons
        });
        this.message.present();
    }

    public hide() {
        this.message.dismiss();
    }

}