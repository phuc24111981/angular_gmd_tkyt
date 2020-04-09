import { Component, enableProdMode } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { dbase } from '../../providers/dbase';
import { Inf } from '../../providers/myInfList';
import { TabsPage } from '../tabs/tabs';
import { HttpProvider } from '../../providers/http/http';

if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [HttpProvider]
})
export class LoginPage 
{
  login = '';
  password = '';
  loading: any;

  constructor(public alertCtrl: AlertController, public ht:HttpProvider, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    //this.password = '123';
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
  onLoginClick(args) 
  {
    if (!args.validationGroup.validate().isValid) {
      return;
    }
    this.loadDataLogin();
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

  loadDataLogin() 
  {
    this.presentloading();
    var urlString = Inf.loginUrl(this.login,this.password);
    this.ht.load(urlString)
    .then(data => 
    {
      
      let dataMessage: any = data;
      console.log(dataMessage);
      if( dataMessage != 'e' )
      {
          let str = JSON.stringify(dataMessage);
          str = str.replace(/\\'/g, "'");
          let jsonData: any = JSON.parse(str);
          if (jsonData[0]['r'] == 0) 
          {
            let t: string = jsonData[0]['TYPE'];

            dbase.setUser(this.login);
            dbase.setType(t);
            console.log(dbase.getType());
            this.navCtrl.setRoot(TabsPage);
            
          }
          else if (jsonData[0]['r'] == 1)
          {
            this.presentAlert("Lỗi", "Mật khẩu không đúng");
          }

          else if (jsonData[0]['r'] == 2)
          {
            this.presentAlert("Lỗi", "Tài khoản không hiện hữu");
          }
          else
          {
            this.presentAlert("Lỗi", "Có lỗi xảy ra, xin xem lại kết nối internet");
          }
      }
      else
      {
        this.presentAlert('Lỗi','Không thể kết nối với hệ thống');
      }
      this.dismissloading();
    });
  }
  ionViewDidLoad() {
    //dbase.setUser('00070');
  }

}


