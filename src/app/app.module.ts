import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { ReviewPage } from '../pages/review/review';
import { TakescorePage } from '../pages/takescore/takescore';
import { ViewreportPage } from '../pages/viewreport/viewreport';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CcupProvider } from '../providers/ccup/ccup';

import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { DxButtonModule } from 'devextreme-angular';
import { ReactiveFormsModule } from '@angular/forms';

import { DxPopupModule, DxTemplateModule } from 'devextreme-angular';
import { ProgressBarModule } from "angular-progress-bar";
import { DxLoadIndicatorModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    MyApp,
    ReviewPage,
    TakescorePage,
    ViewreportPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FileUploadModule,
    DxButtonModule,
    ReactiveFormsModule,
    DxPopupModule,
    DxTemplateModule,
    ProgressBarModule,
    DxLoadIndicatorModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ReviewPage,
    TakescorePage,
    ViewreportPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CcupProvider
  ]
})
export class AppModule {}
