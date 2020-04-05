import { Component, enableProdMode } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Platform } from 'ionic-angular';
import { Inf } from '../../providers/myInfList';
import { DichuyenaddnewPage } from '../dichuyenaddnew/dichuyenaddnew';
import { dbase } from '../../providers/dbase';
import { LoginPage } from '../login/login';

if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@IonicPage()
@Component({
  selector: 'page-dichuyen',
  templateUrl: 'dichuyen.html',
  providers: [HttpProvider]
})
export class DichuyenPage {

  devWidth: number = 0;
  usercode: string = '';
  indexData: any;
  loading: any;

  constructor(public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public platform: Platform, 
    public ht:HttpProvider, public navCtrl: NavController, public navParams: NavParams) 
  {
    this.devWidth = this.platform.width();
    
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
  Addnew()
  {
    if(dbase.checkLogin())
    {
      this.navCtrl.push(DichuyenaddnewPage,
        {
            user: this.usercode
        });
    }
    else
    {
      this.presentAlert('','Vui lòng đăng nhập');
    }
  }

  ionViewDidEnter() 
  {    
    this.usercode = dbase.getUser();
    this.loadData();
  }

  loadData() 
  {
    //this.presentloading();
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
    //this.dismissloading();
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
