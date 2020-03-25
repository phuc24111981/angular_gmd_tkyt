import { Component } from '@angular/core';

import { KhaibaocanhanPage } from '../khaibaocanhan/khaibaocanhan';
import { LichsudichuyenPage } from '../lichsudichuyen/lichsudichuyen';
import { LichsugapgoPage } from '../lichsugapgo/lichsugapgo';
import { ThongkePage } from '../thongke/thongke';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage 
{

  tab1Root = KhaibaocanhanPage;
  tab2Root = LichsudichuyenPage;
  tab3Root = LichsugapgoPage;
  tab4Root = ThongkePage;

  constructor() {

  }
}
