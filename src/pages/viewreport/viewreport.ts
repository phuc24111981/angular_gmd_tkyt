import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component
({
  selector: 'page-viewreport',
  templateUrl: 'viewreport.html',
})
export class ViewreportPage 
{

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {

  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad ViewreportPage');
  }

}
