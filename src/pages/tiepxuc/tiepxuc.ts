import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Platform } from 'ionic-angular';
import { Inf } from '../../providers/myInfList';

@IonicPage()
@Component({
  selector: 'page-tiepxuc',
  templateUrl: 'tiepxuc.html',
  providers: [HttpProvider]
})
export class TiepxucPage 
{
  devWidth: number = 0;
  usercode: string;
  indexData: any;


  constructor(public alertCtrl: AlertController, public platform: Platform, 
    public ht:HttpProvider, public navCtrl: NavController, public navParams: NavParams) 
  {
    this.devWidth = this.platform.width();
    this.usercode = '00070';
  }

  presentAlert(title: string, content: string) 
  {
    const alert = this.alertCtrl.create
    ({
        title: title,
        subTitle: content,
        buttons: ['OK']
    });
    alert.present();
  }

  Save()
  {
    console.log(this.indexData);
    var dataM: string = JSON.stringify(this.indexData);
    console.log(dataM);
    var urlString = Inf.khaibaotiepxucInsert(this.usercode,dataM);
    console.log(urlString);
    this.ht.load(urlString).then(data => 
      {
        this.jsonSaveParse(data);
      });
  }

  jsonSaveParse(dataMessage: any) 
  {
    console.log(dataMessage);
    if( dataMessage.length > 0 )
    {
        let str = JSON.stringify(dataMessage);
        str = str.replace(/\\'/g, "'");
        let jsonData = JSON.parse(str);

        if (jsonData[0]['r'] == 0) 
        {
          this.presentAlert("Lỗi", "Có lỗi xảy ra, không lưu được");
        }
        else 
        {
          this.presentAlert("Thành công", "Dữ liệu đã được lưu");
        }
    }

  }

  ionViewDidEnter() 
  {    
    this.loadData();
  }

  loadData() 
  {
    var urlString = Inf.tiepxucSelectAll();
    console.log('sdạlksadjf' + urlString);
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
