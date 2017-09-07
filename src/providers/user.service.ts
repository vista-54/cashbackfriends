import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import {Storage} from "@ionic/storage";
import {RequestService} from "./request.service";
import {URL} from "./url.constants"

@Injectable()

export class UserService {


    constructor(private http: Http, public storage: Storage, private request: RequestService) {
    }

    /**
     *
     * @param {Headers} headers
     * @param token
     */

    private createAuthorizationHeader(headers: Headers, token) {
        headers.append('Authorization', 'Token ' + token);
        // headers.append('Authorization', 'Token 8da08e16a1e783b51fb0a600a62653f8aa8861b8'); //for debug
        headers.append('Content-Type', 'application/json');
    }

    /**
     *
     * @param credentials
     * @returns {Observable<any>}
     */
    code(credentials) {
        return this.request.post(URL.login.code, credentials)
    }

    /**
     *
     * @param credentials
     * @returns {Observable<any>}
     */
    getToken(credentials) {
        return this.request.post('https://app.cashbackfriends.online/clients/get_token', credentials)
    }

    /**
     *
     * @param credentials
     * @returns {Promise<Observable<any>>}
     */
    registration(credentials) {
        return this.storage.get('token').then((val) => {
            let headers = new Headers();
            this.createAuthorizationHeader(headers, val);
            return this.request.post('https://app.cashbackfriends.online/clients/register', credentials, {headers: headers})
        })
    }

    getInfo() {
        this.storage.get('token').then((val) => {
            let headers = new Headers();
            this.createAuthorizationHeader(headers, val);
            this.http.get('http://app.cashbackfriends.online/clients/get_info', {headers: headers})
                .subscribe(data => {
                    this.storage.set('user', data);
                    console.log(data);
                })
        })
    }

    getFriends() {
        return this.storage.get('token').then((val) => {
            let headers = new Headers();
            this.createAuthorizationHeader(headers, val);
            return this.http.get('http://app.cashbackfriends.online/clients/get_friends', {headers: headers})
                .map((response: Response) => response.json())

        })
    }

    getPurchases() {
        return this.storage.get('token').then((val) => {
            let headers = new Headers();
            this.createAuthorizationHeader(headers, val);
            return this.http.get('http://app.cashbackfriends.online/clients/get_purchases', {headers: headers})

        })
    }

    getWithdrawals() {
        return this.storage.get('token').then((val) => {
            let headers = new Headers();
            this.createAuthorizationHeader(headers, val);
            return this.http.get('http://app.cashbackfriends.online/clients/withdrawals', {headers: headers})
        })
    }

    getCatalog() {
        return this.storage.get('token').then((val) => {
            let headers = new Headers();
            this.createAuthorizationHeader(headers, val);
            return this.http.get('http://app.cashbackfriends.online/clients/get_city_catalog', {headers: headers})
        })
    }


}