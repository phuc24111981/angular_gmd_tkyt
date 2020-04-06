import { Component } from '@angular/core';

import { TrieuchungPage } from '../trieuchung/trieuchung';
import { TiepxucPage } from '../tiepxuc/tiepxuc';
import { DichuyenPage } from '../dichuyen/dichuyen';
import { ThongkePage } from '../thongke/thongke';
import { NavController } from 'ionic-angular';
import { dbase } from '../../providers/dbase';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage 
{

  tab1Root = TrieuchungPage;
  tab2Root = TiepxucPage;
  tab3Root = DichuyenPage;
  tab4Root = ThongkePage;


  thongke: boolean = false;

  constructor(public navCtrl: NavController) 
  {

  }

  ionViewDidEnter()
  {
    if(dbase.checkType())
    {
      this.thongke = true;
    }
    else
    {
      this.thongke = false;
    }
  }
}
