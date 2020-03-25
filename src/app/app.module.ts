import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FileUploadModule } from 'ng2-file-upload';
import { DxButtonModule } from 'devextreme-angular';
import { ReactiveFormsModule } from '@angular/forms';

import { DxPopupModule, DxTemplateModule } from 'devextreme-angular';
import { ProgressBarModule } from "angular-progress-bar";
import { DxLoadIndicatorModule } from 'devextreme-angular';

import { KhaibaocanhanPage } from '../pages/khaibaocanhan/khaibaocanhan';
import { LichsudichuyenPage } from '../pages/lichsudichuyen/lichsudichuyen';
import { LichsugapgoPage } from '../pages/lichsugapgo/lichsugapgo';
import { ThongkePage } from '../pages/thongke/thongke';

import { HttpProvider } from '../providers/http/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    KhaibaocanhanPage,
    LichsudichuyenPage,
    LichsugapgoPage,
    ThongkePage
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
    DxLoadIndicatorModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    KhaibaocanhanPage,
    LichsudichuyenPage,
    LichsugapgoPage,
    ThongkePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider
  ]
})
export class AppModule {}
