import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {OperationsPage} from "../operations/operations";
/**
 * Generated class for the OperationsSettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-operations-settings',
  templateUrl: 'operations-settings.html',
})
export class OperationsSettingsPage{

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperationsSettingsPage');
  }



}
