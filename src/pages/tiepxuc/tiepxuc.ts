import { Component, enableProdMode } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ActionSheetController, App } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Platform } from 'ionic-angular';
import { Inf } from '../../providers/myInfList';
import { dbase } from '../../providers/dbase';
import { LoginPage } from '../login/login';
import { ChangepasswordPage } from '../changepassword/changepassword';

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

  constructor(private app:App, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public platform: Platform, 
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
                  this.navCtrl.push(ChangepasswordPage);
                }
            }
            ,
            {
                text: 'Đăng xuất',

                handler: () => {
                  dbase.logout();
                  this.app.getRootNav().setRoot(LoginPage);
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
    if( dataMessage  != 'e' )
    {
        let str = JSON.stringify(dataMessage);
        str = str.replace(/\\'/g, "'");
        let jsonData = JSON.parse(str);

        if (jsonData[0]['r'] == 0) 
        {
          this.presentAlert("Lỗi", "Có lỗi xảy ra, xin xem lại kết nối internet");
        }
        else 
        {
          this.presentAlert("Thành công", "Dữ liệu đã được lưu");
        }
    }
    else
    {
      this.presentAlert('Lỗi','Không thể kết nối với hệ thống');
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
    if( dataMessage != 'e' )
    {
        let str = JSON.stringify(dataMessage);
        str = str.replace(/\\'/g, "'");
        let jsonData = JSON.parse(str);
        this.indexData = jsonData;
    }
    else
    {
      this.presentAlert('Lỗi','Không thể kết nối với hệ thống');
    }

  }

}
