import {Component} from "@angular/core";
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from "ionic-angular";
import {UserService} from "../../providers/user.service";
import {Storage} from "@ionic/storage";

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
    private error: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public auth: UserService, storage: Storage, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
        storage.set('start_page', 'register');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    validation() {
        if (this.user.promo_code.length !== 8) {
            this.error = 'Неверный промокод';
            return false;
        }
        if (this.user.first_name.length === 0) {
            this.error = 'Имя не может быть пустым';
            return false;
        }
        if (this.user.last_name.length === 0) {
            this.error = 'Фамилия не может быть пустой';
            return false;
        }
        return true;
    }

    registration() {
        // this.navCtrl.push('tabs'); //for debug only
        if (this.validation()) {
            let loader = this.loadingCtrl.create({
                content: "Пожалуйста, подождите...",
            });
            loader.present();
            this.auth.registration(JSON.stringify(this.user))
                .then((val) => {
                    val.subscribe(
                        data => {
                            loader.dismiss();
                            let alert = this.alertCtrl.create({
                                title: 'Поздравляем!',
                                subTitle: data.message,
                                buttons: ['OK']
                            });
                            alert.present();
                            this.navCtrl.push('tabs');
                        },
                        err => {
                            let error, errors;
                            loader.dismiss();
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

                            let alert = this.alertCtrl.create({
                                title: 'Ошибка',
                                subTitle: error,
                                buttons: ['OK']
                            });
                            alert.present();
                        }
                    );
                });

        }
        else {
            let alert = this.alertCtrl.create({
                title: 'Ошибка',
                subTitle: this.error,
                buttons: ['OK']
            });
            alert.present();
        }

    }

}
