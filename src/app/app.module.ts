import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FileUploadModule } from 'ng2-file-upload';

import { ReactiveFormsModule } from '@angular/forms';

import { ProgressBarModule } from "angular-progress-bar";


import { DichuyenPage } from '../pages/dichuyen/dichuyen';
import { TiepxucPage } from '../pages/tiepxuc/tiepxuc';
import { TrieuchungPage } from '../pages/trieuchung/trieuchung';
import { ThongkePage } from '../pages/thongke/thongke';

import { HttpProvider } from '../providers/http/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DichuyenaddnewPage } from '../pages/dichuyenaddnew/dichuyenaddnew';
// import { DxDataGridModule, DxBulletModule, DxTemplateModule, DxPivotGridModule, DxChartModule } from 'devextreme-angular';
import { DevExtremeModule } from 'devextreme-angular'; // import all devextreme modules
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';

@NgModule
(
  {
    declarations: 
    [
      MyApp,
      TabsPage,
      ThongkePage,
      DichuyenPage,
      TiepxucPage,
      TrieuchungPage,
      DichuyenaddnewPage,
      LoginPage,
      LogoutPage,
      ChangepasswordPage
    ],
    imports: 
    [
      BrowserModule,
      IonicModule.forRoot(MyApp),
      HttpClientModule,
      FileUploadModule,
      ReactiveFormsModule,
      ProgressBarModule,
      HttpModule,
      DevExtremeModule
    ],
    bootstrap: [IonicApp],
    entryComponents: 
    [
      MyApp,
      TabsPage,
      DichuyenPage,
      TiepxucPage,
      TrieuchungPage,
      ThongkePage,
      DichuyenaddnewPage,
      LoginPage,
      LogoutPage,
      ChangepasswordPage
    ],
    providers: 
    [
      StatusBar,
      SplashScreen,
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      HttpProvider
    ]
  }
)
export class AppModule {}
