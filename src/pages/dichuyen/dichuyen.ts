import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Platform } from 'ionic-angular';
import { Inf } from '../../providers/myInfList';
import { DichuyenaddnewPage } from '../dichuyenaddnew/dichuyenaddnew';

@IonicPage()
@Component({
  selector: 'page-dichuyen',
  templateUrl: 'dichuyen.html',
  providers: [HttpProvider]
})
export class DichuyenPage {

  devWidth: number = 0;
  usercode: string;
  indexData: any;


  constructor(public alertCtrl: AlertController, public platform: Platform, 
    public ht:HttpProvider, public navCtrl: NavController, public navParams: NavParams) 
  {
    this.devWidth = this.platform.width();
    this.usercode = '00070';
  }

  Addnew()
  {
    this.navCtrl.push(DichuyenaddnewPage,
      {
          user: this.usercode
      });
  }

  ionViewDidEnter() 
  {    
    this.loadData();
  }

  loadData() 
  {
    var urlString = Inf.lichsudichuyenSelect(this.usercode);
    console.log(urlString);
    this.ht.load(urlString)
    .then(data => 
    {
      this.jsonFlatParse(data);
    });
  }

  jsonFlatParse(dataMessage: any) 
  {
    this.indexData = null;
    console.log(dataMessage);
    if( dataMessage.length > 0 )
    {
        let str = JSON.stringify(dataMessage);
        str = str.replace(/\\'/g, "'");
        let jsonData = JSON.parse(str);
        this.indexData = jsonData;
    }

  }

}
