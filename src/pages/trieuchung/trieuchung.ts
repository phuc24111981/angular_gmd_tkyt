import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Platform } from 'ionic-angular';
import { Inf } from '../../providers/myInfList';

@IonicPage()
@Component({
  selector: 'page-trieuchung',
  templateUrl: 'trieuchung.html',
  providers: [HttpProvider]
})
export class TrieuchungPage 
{

  devWidth: number = 0;

  loginUsername: string;
  loginPassword: string;
  usercode: string;
  indexDataTrieuchung: any;



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
    console.log(this.indexDataTrieuchung);
    var dataM: string = JSON.stringify(this.indexDataTrieuchung);
    console.log(dataM);
    var urlString = Inf.khaibaotrieuchungInsert(this.usercode,dataM);
    console.log(urlString);
    this.ht.load(urlString).then(data => 
      {
        this.jsonSaveParseTrieuchung(data);
      });
  }

  jsonSaveParseTrieuchung(dataMessage: any) 
  {
    this.indexDataTrieuchung = null;
    console.log(dataMessage);
    if( dataMessage.length > 0 )
    {
        let str = JSON.stringify(dataMessage);
        str = str.replace(/\\'/g, "'");
        let jsonData = JSON.parse(str);
        this.indexDataTrieuchung = jsonData;
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
    this.loadDataTrieuchung();
  }

  loadDataTrieuchung() 
  {
    var urlString = Inf.trieuchungSelectAll();
    console.log(urlString);
    this.ht.load(urlString)
    .then(data => 
    {
      this.jsonFlatParseTrieuchung(data);
    });
  }

  jsonFlatParseTrieuchung(dataMessage: any) 
  {
    this.indexDataTrieuchung = null;
    console.log(dataMessage);
    if( dataMessage.length > 0 )
    {
        let str = JSON.stringify(dataMessage);
        str = str.replace(/\\'/g, "'");
        let jsonData = JSON.parse(str);
        this.indexDataTrieuchung = jsonData;
    }

  }

}
