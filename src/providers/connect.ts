import {Injectable} from "@angular/core";
import {Network} from "@ionic-native/network";

@Injectable()

export class Connect {
    public isConnected = true;

    constructor(private network: Network) {
        console.log('checking connection...');
        this.network.onDisconnect().subscribe(() => {
            console.log('offline');
            this.isConnected = false;
        });
        this.network.onConnect().subscribe(() => {
            console.log('online');
            this.isConnected = true;
        })
    }


}