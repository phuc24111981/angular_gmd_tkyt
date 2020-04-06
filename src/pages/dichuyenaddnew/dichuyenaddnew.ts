import { Component, enableProdMode } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Inf } from '../../providers/myInfList';
import { dbase } from '../../providers/dbase';

if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@IonicPage()
@Component({
  selector: 'page-dichuyenaddnew',
  templateUrl: 'dichuyenaddnew.html',
})
export class DichuyenaddnewPage 
{
  devWidth: number = 0;
  usercode: string;
  saveData: any;

  diadiemden: string = '';
  ngaybatdau: string = '';
  giobatdau: string = '';
  ngayketthuc: string = '';
  giokethuc: string = '';
  phuongtien: string = '';

  constructor(public ht:HttpProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() 
  {
    //this.usercode = this.navParams.get("user");
    this.usercode = dbase.getUser();
    this.ngaybatdau = Inf.getCurrentDatetimeWithTimeZone();
    this.ngayketthuc = Inf.getCurrentDatetimeWithTimeZone();
    this.giobatdau = '00:00';
    this.giokethuc = '00:00';
    console.log(this.usercode);
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
    if(this.diadiemden.length > 0 && this.phuongtien.length > 0)
    {
      console.log(this.saveData);
      var dataM: string = JSON.stringify(this.saveData);
      console.log(dataM);
      var urlString = Inf.lichsudichuyenInsert(this.usercode,this.diadiemden,this.ngaybatdau,this.giobatdau,
        this.ngayketthuc,this.giokethuc,this.phuongtien);
      console.log(urlString);
      this.ht.load(urlString).then(data => 
        {
          this.jsonSaveParse(data);
        });
    }
    else
    {
      this.presentAlert('Lỗi','Vui lòng nhập đầy đủ thông tin');
    }
    
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
          this.presentAlert("Lỗi", "Có lỗi xảy ra, xin xem lại kết nối internet");
        }
        else 
        {
          this.presentAlert("Thành công", "Dữ liệu đã được lưu");
        }
    }

  }

}
