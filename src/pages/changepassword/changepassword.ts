import { Component, enableProdMode } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { dbase } from '../../providers/dbase';
import { Inf } from '../../providers/myInfList';
import { HttpProvider } from '../../providers/http/http';

if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
  providers: [HttpProvider]
})
export class ChangepasswordPage 
{

  password = '';
  npassword = '';
  npassword2 = '';
  loading: any;

  constructor(public alertCtrl: AlertController, public ht:HttpProvider, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
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
    this.loadDataChangePass();
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

  loadDataChangePass() 
  {
    if(this.npassword == this.npassword2)
    {
      this.presentloading();
      var urlString = Inf.passChangeUrl(dbase.getUser(),this.password,this.npassword);
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
              this.presentAlert("Thành công", "Mật khẩu đã được đổi");
            }
            else if (jsonData[0]['r'] == 1)
            {
              this.presentAlert("Lỗi", "Mật khẩu hiện tại không đúng");
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
    else
    {
      this.presentAlert('Lỗi','Mật khẩu mới phải nhập 2 lần giống nhau');
    }
  }

}
