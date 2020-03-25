import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThongkePage } from './thongke';

@NgModule({
  declarations: [
    ThongkePage,
  ],
  imports: [
    IonicPageModule.forChild(ThongkePage),
  ],
})
export class ThongkePageModule {}
