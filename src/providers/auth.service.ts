import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import {Storage} from "@ionic/storage";

@Injectable()
export class AuthService {

    constructor(private http: Http, private storage: Storage) {
    }

    code(credentials) {
        return this.http.post('https://app.cashbackfriends.online/clients/send_auth_sms', credentials)
    }

    getToken(credentials) {
        this.http.post('https://app.cashbackfriends.online/clients/get_token', credentials)
            .map((response: Response) => response.json())
            .subscribe(
                data => {
                    this.storage.set('token', data.token);
                    console.log(data);
                }
            )
    }

}