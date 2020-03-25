import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakescorePage } from './takescore';

@NgModule({
  declarations: [
    TakescorePage,
  ],
  imports: [
    IonicPageModule.forChild(TakescorePage),
  ],
})
export class TakescorePageModule {}
