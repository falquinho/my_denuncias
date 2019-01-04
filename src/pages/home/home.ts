import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
    this.navCtrl.push("NewDenunciaPage");
  }

}
