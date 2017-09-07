import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {UserService} from "../../providers/user.service";
import {Storage} from "@ionic/storage";
import {MaskedInputDirective} from "angular2-text-mask";
import {StatusBar} from "@ionic-native/status-bar";
import {Message} from "../../providers/message";
import {Connect} from "../../providers/connect";
import {Loader} from "../../providers/loader";

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
        phone: '+7',
        code: ''
    };
    public isCodeShow = false;
    public isLoginEnable = true;
    public isSendCodeEnable = true;

    constructor(public navCtrl: NavController,public navParams: NavParams, private auth: UserService, private storage: Storage, public statusBar: StatusBar,
                private message: Message, private connect: Connect, private loader: Loader) {
        storage.set('start_page', 'login');
        statusBar.backgroundColorByHexString('#5c45c3');


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    /**
     *
     * @returns {boolean}
     */
    public sendCode() {
        if (this.user.phone.length !== 12) {
            this.message.show('Ошибка', 'Поле телефона должно содержать 12 цифр');
            return false;
        }
        if (!this.connect.isConnected) {
            this.message.show('Ошибка сети', 'Подключение отсуствует');
            return false;
        }
        this.isLoginEnable = false;
        this.auth.code(this.user)
            .subscribe(
                data => {
                    this.isCodeShow = true;
                },
                err => {
                    this.loader.hide();
                    let errorText: any;
                    try {
                        errorText = JSON.parse(err._body);
                        this.message.show('Ошибка', errorText.code || errorText.errors)
                    }
                    catch (e) {
                        this.message.show('Ошибка', 'Неизвестная ошибка')
                    }
                }
            )
    }

    /**
     *
     * @returns {boolean}
     */
    public login() {
        if (this.user.code.length !== 6) {
            this.message.show('Ошибка', 'Проверочный код введен не корректно');
            return false;
        }
        if (!this.connect.isConnected) {
            this.message.show('Ошибка сети', 'Подключение отсуствует');
            return false;
        }
        this.auth.getToken(this.user)
            .subscribe(
                data => {
                    if (data.token) {
                        this.storage.set('token', data.token);
                        if (data.is_registered) {
                            this.navCtrl.push('tabs');
                        } else {
                            this.navCtrl.push('register');
                        }
                    }
                },
                err => {
                    this.loader.hide();
                    let errorText: any;
                    try {
                        errorText = JSON.parse(err._body);
                        this.message.show('Ошибка', errorText.code || errorText.errors)
                    }
                    catch (e) {
                        this.message.show('Ошибка', 'Неизвестная ошибка')
                    }
                },
            )


    }

}
