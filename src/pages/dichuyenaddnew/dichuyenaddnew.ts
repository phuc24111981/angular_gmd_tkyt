import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Platform } from 'ionic-angular';
import { Inf } from '../../providers/myInfList';

@IonicPage()
@Component({
  selector: 'page-dichuyenaddnew',
  templateUrl: 'dichuyenaddnew.html',
})
export class DichuyenaddnewPage 
{
  devWidth: number = 0;
  usercode: string;
  saveData: any;

  diadiemden: string = '';
  ngaybatdau: string = '';
  giobatdau: string = '';
  ngayketthuc: string = '';
  giokethuc: string = '';
  phuongtien: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.usercode = this.navParams.get("user");
    console.log(this.usercode);
  }

}
