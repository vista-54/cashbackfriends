import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Loader} from "./loader";

@Injectable()

export class RequestService {
    // private loader: any;

    constructor(private http: Http, private loader: Loader) {
    }

    /**
     *
     * @param url
     * @param credentials
     * @param {any} options
     * @returns {Observable<any>}
     */
    public post(url, credentials, options = null) {
        this.loader.show();
        return this.http.post(url, credentials, options)
            .map(response => {
                    this.loader.hide();
                    return response.json()
                }
            )
    }

    public get (url, credentials, options) {

    }
}