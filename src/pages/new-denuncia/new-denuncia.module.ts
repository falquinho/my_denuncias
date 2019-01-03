import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDenunciaPage } from './new-denuncia';

@NgModule({
  declarations: [
    NewDenunciaPage,
  ],
  imports: [
    IonicPageModule.forChild(NewDenunciaPage),
  ],
})
export class NewDenunciaPageModule {}
