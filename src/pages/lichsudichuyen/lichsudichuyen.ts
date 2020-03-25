import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-lichsudichuyen',
  templateUrl: 'lichsudichuyen.html',
})
export class LichsudichuyenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LichsudichuyenPage');
  }

}
