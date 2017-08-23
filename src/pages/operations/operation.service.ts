import {Injectable} from "@angular/core";
import {Operation} from "./operation";

@Injectable()


export class OperationService {
    private currentUser;


    setCurrentUser(user) {
        this.currentUser = user;
    }

    public transformOperationsArr(data) {
        let tmpArr = [];
        data.results.forEach(element => {
            let tmpObj = new Operation();
            let client;
            client = element.client;
            if (client.id !== this.currentUser.id) {
                if (client.hasOwnProperty('first_name') && client.hasOwnProperty('last_name')) {
                    let username = element.client.first_name + element.client.last_name;
                    tmpObj.setUsername(username);
                }
            }
            if (element.hasOwnProperty('sum')) {
                tmpObj.setSum(element.sum);
            }
            if (element.hasOwnProperty('category')) {
                tmpObj.setCategory(element.category);
            } else {
                tmpObj.setCategory('Вывод cashback');
            }
            if (element.hasOwnProperty('last_updated')) {
                let time = +new Date(element.last_updated) / 1000;
                tmpObj.setTime(time);
            }
            tmpArr.push(tmpObj);
        });
        return tmpArr;
    }

    public sortByDate(a, b) {
        if (a.time < b.time)
            return 1;
        if (a.time > b.time)
            return -1;
        return 0;
    }
}