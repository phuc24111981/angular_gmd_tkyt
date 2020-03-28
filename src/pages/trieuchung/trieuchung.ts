import { Component, enableProdMode } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Platform } from 'ionic-angular';
import { Inf } from '../../providers/myInfList';
import { dbase } from '../../providers/dbase';


if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

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
  usercode: string = '';
  indexDataTrieuchung: any;



  constructor(public alertCtrl: AlertController, public platform: Platform, 
    public ht:HttpProvider, public navCtrl: NavController, public navParams: NavParams) 
  {
    this.devWidth = this.platform.width();
    this.usercode = dbase.getUser();
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
    if(this.usercode.length > 0)
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
    else
    {
      this.presentAlert('Lỗi','Vui lòng nhập Mã nhân viên');
    }
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
    this.usercode = dbase.getUser();
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
