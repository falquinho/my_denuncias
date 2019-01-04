import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewDenunciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-denuncia',
  templateUrl: 'new-denuncia.html',
})
export class NewDenunciaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NewDenunciaPage');
  }


  submitBtnClicked() {
    //
  }

  
  cameraBtnClicked() {
    //
  }

}
