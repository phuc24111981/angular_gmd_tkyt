import { Component } from '@angular/core';

import { TrieuchungPage } from '../trieuchung/trieuchung';
import { TiepxucPage } from '../tiepxuc/tiepxuc';
import { DichuyenPage } from '../dichuyen/dichuyen';
import { ThongkePage } from '../thongke/thongke';
import { LoginPage } from '../login/login';
import { dbase } from '../../providers/dbase';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage 
{

  tab1Root = TrieuchungPage;
  tab2Root = TiepxucPage;
  tab3Root = DichuyenPage;
  tab4Root = ThongkePage;

  constructor(public navCtrl: NavController) 
  {

  }
}
