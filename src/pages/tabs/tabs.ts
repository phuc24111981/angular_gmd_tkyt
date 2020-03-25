import { Component } from '@angular/core';

import { ReviewPage } from '../review/review';
import { TakescorePage } from '../takescore/takescore';
import { ViewreportPage } from '../viewreport/viewreport';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage 
{

  tab1Root = ReviewPage;
  tab2Root = TakescorePage;
  tab3Root = ViewreportPage;

  constructor() {

  }
}
