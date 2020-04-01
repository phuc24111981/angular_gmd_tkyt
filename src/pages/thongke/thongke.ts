import { Component, enableProdMode } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ViewChild, AfterViewInit } from '@angular/core';
import { DxPivotGridComponent, DxChartComponent } from 'devextreme-angular';
import { HttpProvider } from '../../providers/http/http';
import { Platform } from 'ionic-angular';
import { Inf } from '../../providers/myInfList';

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
  xlsName1:string = 'gmd_kbyt_trieuchung';
  loading: any;
  trieuchungData: any;

  constructor(public loadingCtrl: LoadingController, public ht:HttpProvider, public navCtrl: NavController, public navParams: NavParams) 
  {
    //this.customizeTooltip = this.customizeTooltip.bind(this);

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
    this.presentloading();
    var urlString = Inf.khaibaotrieuchungCountAll();
    this.ht.load(urlString)
    .then(data => 
    {
      this.jsonTrieuchungParse(data);
    });
  }

  jsonTrieuchungParse(dataMessage: any) 
  {
    this.dismissloading();
    this.trieuchungData = null;
    console.log(dataMessage);
    if( dataMessage.length > 0 )
    {
        let str = JSON.stringify(dataMessage);
        str = str.replace(/\\'/g, "'");
        let jsonData = JSON.parse(str);
        this.trieuchungData = jsonData;
    }

  }

}
