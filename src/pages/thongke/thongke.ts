import { Component, enableProdMode } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, App } from 'ionic-angular';
// import { ViewChild, AfterViewInit } from '@angular/core';
// import { DxPivotGridComponent, DxChartComponent } from 'devextreme-angular';
import { HttpProvider } from '../../providers/http/http';
import { Platform } from 'ionic-angular';
import { Inf } from '../../providers/myInfList';
import { LoginPage } from '../login/login';
import { dbase } from '../../providers/dbase';
import { ChangepasswordPage } from '../changepassword/changepassword';

if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@IonicPage()
@Component({
  selector: 'page-thongke',
  templateUrl: 'thongke.html',
  providers: [HttpProvider]
})
export class ThongkePage 
// implements AfterViewInit
{
//   @ViewChild(DxPivotGridComponent) pivotGrid: DxPivotGridComponent;
//   @ViewChild(DxChartComponent) chart: DxChartComponent;
//   pivotGridDataSource: any;

  loading: any;
  trieuchungData: any;
  tiepxucData: any;
  dichuyenData: any;

  export: boolean = true;

  constructor(private app:App, public actionSheetCtrl: ActionSheetController, public platform: Platform, public loadingCtrl: LoadingController, public ht:HttpProvider, public navCtrl: NavController, public navParams: NavParams) 
  {
    //this.customizeTooltip = this.customizeTooltip.bind(this);
    if (this.platform.is('android')) 
    {
      this.export = false;

    } 
    else if (this.platform.is('ios')) 
    {
      this.export = false;
    } 
    else 
    {
      this.export = true;
    }
    
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
                  this.app.getRootNav().setRoot(LoginPage);
                }
            }
        ]
    });

    actionSheet.present();
  }
//   ngAfterViewInit() 
//   {
//     this.pivotGrid.instance.bindChart(this.chart.instance, 
//         {
//       dataFieldsDisplayMode: "splitPanes",
//       alternateDataFields: false
//     });

//     setTimeout(() => {
//         var dataSource = this.pivotGrid.instance.getDataSource();
//         dataSource.expandHeaderItem('row', ['North America']);
//         dataSource.expandHeaderItem('column', [2013]);
//     }, 0);
//   }

//   customizeTooltip(args) {
//     return {
//       html: args.seriesName + " | Total<div class='currency'>" + args.valueText + "</div>"
//     };
//   }
  
  presentloading()
  {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  dismissloading()
  {
    this.loading.dismiss();
  }
  ionViewDidEnter() 
  {    
    this.loadDataTrieuchung();
  }

  loadDataTrieuchung() 
  {
    //this.presentloading();
    var urlString = Inf.khaibaotrieuchungCountAll();
    this.ht.load(urlString)
    .then(data => 
    {
      //this.dismissloading();
      let dataMessage: any = data;
      this.trieuchungData = null;
      console.log(dataMessage);
      if( dataMessage != 'e' )
      {
          let str = JSON.stringify(dataMessage);
          str = str.replace(/\\'/g, "'");
          let jsonData = JSON.parse(str);
          this.trieuchungData = jsonData;
      }
      this.loadDataTiepxuc();
    });
  }

  loadDataTiepxuc() 
  {
    //this.presentloading();
    var urlString = Inf.khaibaotiepxucCountAll();
    this.ht.load(urlString)
    .then(data => 
    {
      //this.dismissloading();
      let dataMessage: any = data;
      this.tiepxucData = null;
      console.log(dataMessage);
      if( dataMessage  != 'e' )
      {
          let str = JSON.stringify(dataMessage);
          str = str.replace(/\\'/g, "'");
          let jsonData = JSON.parse(str);
          this.tiepxucData = jsonData;
      }
      this.loadDataDichuyen();
    });
  }

  loadDataDichuyen() 
  {
    //this.presentloading();
    var urlString = Inf.khaibaodichuyenCountAll();
    this.ht.load(urlString)
    .then(data => 
    {
      //this.dismissloading();
      let dataMessage: any = data;
      this.dichuyenData = null;
      console.log(dataMessage);
      if( dataMessage  != 'e' )
      {
          let str = JSON.stringify(dataMessage);
          str = str.replace(/\\'/g, "'");
          let jsonData = JSON.parse(str);
          this.dichuyenData = jsonData;
      }
    });
  }
  

}
