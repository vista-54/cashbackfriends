import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {AuthService} from "../../providers/auth.service";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [AuthService]

})

@IonicPage({
    name: 'login',
    segment: 'login'
})

export class LoginPage {

    public user = {
        code: '',
        phone: ''
    };
    public auth: any;
    public isCodeShow = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, auth: AuthService) {
        this.auth = auth;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    public sendCode() {
        this.auth.code(this.user)
            .subscribe(
                data => {
                    if (data.status === 200) {
                        this.isCodeShow = true;
                    }
                }
            )
    }

    public login() {
        this.auth.getToken(this.user)
    }

}
