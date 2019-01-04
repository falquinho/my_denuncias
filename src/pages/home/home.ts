import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewDenunciaPage } from '../new-denuncia/new-denuncia';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  denuncias: string = undefined;
  http_code: string = undefined;

  constructor(public navCtrl: NavController) {
    
  }

  fabClicked() {
    this.navCtrl.push(NewDenunciaPage);
  }

}
