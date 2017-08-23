import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import {Storage} from "@ionic/storage";


@Injectable()
export class UserService {

    private token;

    constructor(private http: Http, public storage: Storage) {
        this.token = localStorage.getItem('token')
    }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', 'Token ' + this.token);
        // headers.append('Authorization', 'Token 8da08e16a1e783b51fb0a600a62653f8aa8861b8');
        headers.append('Content-Type', 'application/json');
    }

    code(credentials) {
        return this.http.post('https://app.cashbackfriends.online/clients/send_auth_sms', credentials)
    }

    getToken(credentials) {
        return this.http.post('https://app.cashbackfriends.online/clients/get_token', credentials)
            .map((response: Response) => response.json())
    }

    registration(credentials) {
        return this.storage.get('token').then((val) => {
            this.token = val;
            let headers = new Headers();
            this.createAuthorizationHeader(headers);
            return this.http.post('https://app.cashbackfriends.online/clients/register', credentials, {headers: headers})
                .map((response: Response) => response.json())
        })
    }

    getInfo() {
        this.storage.get('token').then((val) => {
            this.token = val;
            let headers = new Headers();
            this.createAuthorizationHeader(headers);
            this.http.get('http://app.cashbackfriends.online/clients/get_info', {headers: headers})
                .map((response: Response) => response.json())
                .subscribe(data => {
                    this.storage.set('user', data);
                    console.log(data);
                })
        })
    }

    getFriends() {
        return this.storage.get('token').then((val) => {
            this.token = val;
            let headers = new Headers();
            this.createAuthorizationHeader(headers);
            return this.http.get('http://app.cashbackfriends.online/clients/get_friends', {headers: headers})
                .map((response: Response) => response.json())

        })
    }

    getPurchases() {
        return this.storage.get('token').then((val) => {
            this.token = val;
            let headers = new Headers();
            this.createAuthorizationHeader(headers);
            return this.http.get('http://app.cashbackfriends.online/clients/get_purchases', {headers: headers})

        })
    }

    getWithdrawals() {
        return this.storage.get('token').then((val) => {
            this.token = val;
            let headers = new Headers();
            this.createAuthorizationHeader(headers);
            return this.http.get('http://app.cashbackfriends.online/clients/withdrawals', {headers: headers})
        })
    }

    getCatalog() {
        return this.storage.get('token').then((val) => {
            this.token = val;
            let headers = new Headers();
            this.createAuthorizationHeader(headers);
            return this.http.get('http://app.cashbackfriends.online/clients/get_city_catalog', {headers: headers})
        })
    }


}