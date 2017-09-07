import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {UserService} from "../../providers/user.service";
import {SocialSharing} from "@ionic-native/social-sharing";
import {Loader} from "../../providers/loader";
import {Message} from "../../providers/message";
import {Connect} from "../../providers/connect";

/**
 * Generated class for the InvitePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-invite',
    templateUrl: 'invite.html',
    providers: [UserService, SocialSharing]
})
export class InvitePage {

    public promo: string;
    public friends;
    private msg = 'Зарегистрируйтесь в приложении используя промокод ';

    /**
     *
     * @param {NavController} navCtrl
     * @param {NavParams} navParams
     * @param {Storage} storage
     * @param {UserService} user
     * @param {SocialSharing} socialSharing
     * @param {Loader} loader
     * @param {Message} message
     * @param {Connect} connect
     */
    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, user: UserService, private socialSharing: SocialSharing, private loader: Loader, private message: Message, private connect: Connect) {
        this.storage.get('user').then(value => {
            this.promo = value.code;
            this.msg += this.promo;
        });
        user.getFriends().then((val) => {
            console.log(val);
            val.subscribe(data => {
                this.friends = data.results;
            }, err => {
                this.loader.hide();
                if (!this.connect.isConnected) {
                    this.message.show('Ошибка сети', 'Подключение отсуствует');
                }
            })
        })

    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad InvitePage');
    }

    share() {
        this.socialSharing.share(this.msg).then(() => {
            console.log('success');
        }).catch(() => {
            console.log('fail');
        })
    }

}
