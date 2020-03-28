import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onLoginClick(args) {
    if (!args.validationGroup.validate().isValid) {
      return;
    }
    dbase.setUser(this.login);
    this.navCtrl.setRoot(TabsPage)
  }
  ionViewDidLoad() {
    //dbase.setUser('00070');
  }

}
