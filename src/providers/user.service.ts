import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Storage} from "@ionic/storage";
import {RequestService} from "./request.service";
import {URL} from "./url.constants"

@Injectable()

export class UserService {
    private headers: Headers;

    /**
     *
     * @param {Http} http
     * @param {Storage} storage
     * @param {RequestService} request
     */
    constructor(private http: Http, public storage: Storage, private request: RequestService) {
        this.headers = new Headers();
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
        return this.request.post(URL.login.token, credentials)
    }

    /**
     *
     * @param credentials
     * @returns {Promise<Observable<any>>}
     */
    registration(credentials) {
        return this.storage.get('token').then((val) => {
            this.createAuthorizationHeader(this.headers, val);
            return this.request.post(URL.register.registration, credentials, {headers: this.headers})
        })
    }

    /**
     *
     */
    getInfo() {
        this.storage.get('token').then((val) => {
            this.createAuthorizationHeader(this.headers, val);
            this.request.get(URL.tabs.getInfo, {headers: this.headers})
                .subscribe(data => {
                    this.storage.set('user', data);
                })
        })
    }

    /**
     *
     * @returns {Promise<Observable<any>>}
     */
    getFriends() {
        return this.storage.get('token').then((val) => {
            this.createAuthorizationHeader(this.headers, val);
            return this.request.get(URL.invite.getFriends, {headers: this.headers})
        })
    }

    /**
     *
     * @returns {Promise<Observable<any>>}
     */
    getPurchases() {
        return this.storage.get('token').then((val) => {
            this.createAuthorizationHeader(this.headers, val);
            return this.request.get(URL.card.getPurchases, {headers: this.headers})

        })
    }

    /**
     *
     * @returns {Promise<Observable<Response>>}
     */
    getWithdrawals() {
        return this.storage.get('token').then((val) => {
            this.createAuthorizationHeader(this.headers, val);
            return this.request.get(URL.card.getWithdrawals, {headers: this.headers})
        })
    }

    /**
     *
     * @returns {Promise<Observable<any>>}
     */
    getCatalog() {
        return this.storage.get('token').then((val) => {
            this.createAuthorizationHeader(this.headers, val);
            return this.request.get(URL.catalog.getCatalog, {headers: this.headers})
        })
    }


}