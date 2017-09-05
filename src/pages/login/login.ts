import {Component} from "@angular/core";
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from "ionic-angular";
import {UserService} from "../../providers/user.service";
import {Storage} from "@ionic/storage";
import {MaskedInputDirective} from "angular2-text-mask";
import {StatusBar} from "@ionic-native/status-bar";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [UserService, MaskedInputDirective],

})

@IonicPage({
    name: 'login',
    segment: 'login'
})

export class LoginPage {

    public user = {
        phone: '',
    };
    public auth: any;
    public isCodeShow = false;
    public isLoginEnable = true;
    public isSendCodeEnable = true;

    constructor(public navCtrl: NavController, public navParams: NavParams, auth: UserService, private storage: Storage,
                public loadingCtrl: LoadingController, public alertCtrl: AlertController, public statusBar: StatusBar) {
        this.auth = auth;
        storage.set('start_page', 'login');
        statusBar.backgroundColorByHexString('#5c45c3');


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }


    public sendCode() {
        this.isLoginEnable = false;
        if (this.user.phone.length !== 12) {
            let alert = this.alertCtrl.create({
                title: 'Ошибка',
                subTitle: 'Поле телефона должно содержать 12 цифр',
                buttons: ['OK']
            });
            alert.present();
            this.isLoginEnable=true;
            return false;
        }
        this.auth.code(this.user)
            .subscribe(
                data => {
                    if (data.status === 200) {
                        this.isCodeShow = true;
                    }
                },
                err => {
                    this.isLoginEnable = true;
                    let errorText = JSON.parse(err._body);
                    let alert = this.alertCtrl.create({
                        title: 'Ошибка',
                        subTitle: errorText.phone[0],
                        buttons: ['OK']
                    });
                    alert.present();
                }
            )
    }

    public login() {
        let loader = this.loadingCtrl.create({
            content: "Пожалуйста, подождите...",
        });
        loader.present();

        this.auth.getToken(this.user)
            .subscribe(
                data => {
                    if (data.token) {
                        loader.dismiss();
                        this.storage.set('token', data.token);
                        this.navCtrl.push('register');
                    }
                },
                err => {
                    let errorText = JSON.parse(err._body);
                    loader.dismiss();
                    let alert = this.alertCtrl.create({
                        title: 'Ошибка',
                        subTitle: errorText.code || errorText.errors,
                        buttons: ['OK']
                    });
                    alert.present();

                },
            )


    }

}
