import { Component, enableProdMode } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Platform } from 'ionic-angular';
import { Inf } from '../../providers/myInfList';
import { dbase } from '../../providers/dbase';
import { ActionSheetController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';
import { ChangepasswordPage } from '../changepassword/changepassword';

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
  loading: any;
  rootPage:any;

  constructor(private app:App, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public platform: Platform, 
    public ht:HttpProvider, public navCtrl: NavController, public navParams: NavParams) 
  {
    this.devWidth = this.platform.width();
    
    
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

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
        title: '',
        buttons: 
        [
            {
                text: 'Tải lại dữ liệu',
                handler: () =>
                {
                  this.loadDataTrieuchung();
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
                    //this.navCtrl.setRoot(LoginPage);
                    this.app.getRootNav().setRoot(LoginPage);
                    //this.router.navigateByUrl('/login/login.html');
                    //this.platform.exitApp();
                    
                }
            }
        ]
    });

    actionSheet.present();
  }

  Save()
  {
    if(dbase.checkLogin())
    {
      this.presentloading();
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
      this.presentAlert('','Vui lòng đăng nhập');
    }
  }

  jsonSaveParseTrieuchung(dataMessage: any) 
  {
    this.dismissloading(); 
    this.indexDataTrieuchung = null;
    console.log(dataMessage);
    if( dataMessage != 'e' )
    {
        let str = JSON.stringify(dataMessage);
        str = str.replace(/\\'/g, "'");
        let jsonData = JSON.parse(str);
        this.indexDataTrieuchung = jsonData;
        if (jsonData[0]['r'] == 0) 
        {
          this.presentAlert("Lỗi", "Không thể kết nối với hệ thống");
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
    this.loadDataTrieuchung();
  }

  loadDataTrieuchung() 
  {
    this.presentloading();
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
    this.dismissloading();
    this.indexDataTrieuchung = null;
    console.log(dataMessage);
    if( dataMessage  != 'e' )
    {
        let str = JSON.stringify(dataMessage);
        str = str.replace(/\\'/g, "'");
        let jsonData = JSON.parse(str);
        this.indexDataTrieuchung = jsonData;
    }
    else
    {
      this.presentAlert('Lỗi','Không thể kết nối với hệ thống');
    }
    
  }

}
