import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { dbase } from '../../providers/dbase';

import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage 
{
  login = '';
  password = '';
  loading: any;
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    //this.password = '123';
  }
  presentloading()
  {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  dismissloading()
  {
    this.loading.dismiss();
  }
  onLoginClick(args) 
  {
    if (!args.validationGroup.validate().isValid) {
      return;
    }
    dbase.setUser(this.login);
    this.navCtrl.setRoot(TabsPage);
  }
  ionViewDidLoad() {
    //dbase.setUser('00070');
  }

}


