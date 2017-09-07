import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {UserService} from "../../providers/user.service";
import {Storage} from "@ionic/storage";
import {Loader} from "../../providers/loader";
import {Message} from "../../providers/message";
import {Connect} from "../../providers/connect";

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
    name: 'register',
    segment: 'register'
})
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
    providers: [UserService]

})

export class RegisterPage {

    public user = {
        city: 'Казань',
        promo_code: '',
        first_name: '',
        last_name: ''
    };

    constructor(public navCtrl: NavController, public navParams: NavParams, public auth: UserService, storage: Storage,
                private loader: Loader, private message: Message, private connect: Connect) {
        storage.set('start_page', 'register');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    validation() {
        if (this.user.promo_code.length !== 8) {
            return 'Неверный промокод';
        }
        if (this.user.first_name.length === 0) {
            return 'Имя не может быть пустым';

        }
        if (this.user.last_name.length === 0) {
            return 'Фамилия не может быть пустой';
        }
        return false;
    }

    /**
     *
     * @returns {boolean}
     */
    registration() {
        // this.navCtrl.push('tabs'); //for debug only
        let validation = this.validation();
        if (validation) {
            this.message.show('Ошибка', validation);
            return false;
        }
        if (!this.connect.isConnected) {
            this.message.show('Ошибка сети', 'Подключение отсуствует');
            return false;
        }
        this.auth.registration(JSON.stringify(this.user))
            .then((val) => {
                val.subscribe(
                    data => {
                        this.loader.hide();
                        this.message.show('Поздравляем!', data.message);
                        this.navCtrl.push('tabs');
                    },
                    err => {
                        let error, errors;
                        this.loader.hide();
                        try {
                            errors = JSON.parse(err._body);
                        } catch (e) {
                            error = 'Ошибка сервера';
                        }
                        try {
                            error = errors.non_field_errors[0]
                        } catch (e) {
                            error = errors.errors;
                        }
                        this.message.show('Ошибка', error);
                    }
                );
            });


    }

}
