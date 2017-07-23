import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { StartPage } from './start';
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
    declarations: [
        StartPage
    ],
    imports: [
        IonicPageModule.forChild(StartPage),
        IonicStorageModule.forRoot()
    ],
    entryComponents: [
        StartPage
    ]
})
export class StartPageModule {
}