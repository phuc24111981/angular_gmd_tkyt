import { Component, enableProdMode } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Platform } from 'ionic-angular';
import { Inf } from '../../providers/myInfList';
import { dbase } from '../../providers/dbase';
import { LoginPage } from '../login/login';

if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@IonicPage()
@Component({
  selector: 'page-tiepxuc',
  templateUrl: 'tiepxuc.html',
  providers: [HttpProvider]
})
export class TiepxucPage 
{
  devWidth: number = 0;
  usercode: string = '';
  indexData: any;
  loading: any;

  constructor(public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public platform: Platform, 
    public ht:HttpProvider, public navCtrl: NavController, public navParams: NavParams) 
  {
    this.devWidth = this.platform.width();
    this.usercode = dbase.getUser();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
        title: '',
        buttons: 
        [
            {
                text: 'Tải lại dữ liệu',
                handler: () =>
                {
                  this.loadData();
                }
            }
            ,
            {
                text: 'Đổi mật khẩu',

                handler: () => {
                    
                }
            }
            ,
            {
                text: 'Đăng xuất',

                handler: () => {
                  dbase.clearUser();
                  this.platform.exitApp();
                }
            }
        ]
    });

    actionSheet.present();
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
    
    if(dbase.checkLogin())
    {
      this.presentloading();
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
    else
    {
      this.presentAlert('','Vui lòng đăng nhập');
    }
  }

  jsonSaveParse(dataMessage: any) 
  {
    this.dismissloading();
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
    this.usercode = dbase.getUser();
    this.loadData();
  }

  loadData() 
  {
    this.presentloading();
    var urlString = Inf.tiepxucSelectAll();
    //console.log('sdạlksadjf' + urlString);
    this.ht.load(urlString)
    .then(data => 
    {
      this.jsonFlatParse(data);
    });
  }

  jsonFlatParse(dataMessage: any) 
  {
    this.dismissloading();
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
