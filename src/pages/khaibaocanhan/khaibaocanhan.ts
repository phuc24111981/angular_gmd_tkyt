import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Platform } from 'ionic-angular';
import { Inf } from '../../providers/myInfList';

@IonicPage()
@Component({
  selector: 'page-khaibaocanhan',
  templateUrl: 'khaibaocanhan.html',
  providers: [HttpProvider]
})
export class KhaibaocanhanPage 
{
  devWidth: number = 0;

  loginUsername: string;
  loginPassword: string;
  wrusername: string;
  indexDataTrieuchung: any;
  indexDataTiepxuc: any;
  indexDataBenh: any;

  constructor(public platform: Platform, public ht:HttpProvider, public navCtrl: NavController, public navParams: NavParams) 
  {
    this.devWidth = this.platform.width();
  }

  ionViewDidEnter() 
  {    
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
