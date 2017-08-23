import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {UserService} from "../../providers/user.service";
import {SocialSharing} from "@ionic-native/social-sharing";

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

    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, user: UserService, private socialSharing: SocialSharing) {
        this.storage.get('user').then(value => {
            this.promo = value.code;
            this.msg += this.promo;
        });
        user.getFriends().then((val) => {
            console.log(val);
            val.subscribe(data => {
                this.friends = data.results;
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
