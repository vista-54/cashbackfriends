import {LoadingController} from "ionic-angular";
import {Injectable} from "@angular/core";

@Injectable()

export class Loader {
    private loader: any;
    private isShown = false;

    constructor(private loadingCtrl: LoadingController) {

    }

    public show() {
        if (!this.isShown) {
            this.loader = this.loadingCtrl.create({
                content: "Пожалуйста, подождите...",
            });
            this.isShown = true;
            this.loader.present();
        }

    }

    public hide() {
        if (this.isShown) {
            this.loader.dismiss();
            this.isShown = false;
        }
    }

}