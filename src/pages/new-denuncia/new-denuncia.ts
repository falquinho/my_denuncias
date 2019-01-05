import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DenunciasApiProvider } from '../../providers/denuncias-api/denuncias-api';
import { Denuncia } from '../../custom_types/denuncia';

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

  base64img:     string = undefined;
  select_motivo: string = "ROUBO";
  user_email:    string = "lucas.falcao.nb@gmail.com";

  
  constructor(
    public  navCtrl:   NavController, 
    public  navParams: NavParams, 
    private camera:    Camera,
    private toastCtrl: ToastController,
    private denunciasApi: DenunciasApiProvider
  ) {}
    
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewDenunciaPage');
  }
  
  
  submitBtnClicked() {

    // como todos os outros dados ja tem valor padrao
    // basta checar se a foto foi capturada
    if( !this.base64img ) {
      this.toastCtrl.create({
        message: "Por favor capture uma foto.",
        duration: 3000
      }).present();

      return;
    }

    // envia dados para serviço web
    let denuncia: Denuncia;
    denuncia.email = this.user_email;
    denuncia.motivo_ocorrencia = this.select_motivo;
    denuncia.imagem.imagem = this.base64img;
    denuncia.imagem.data_de_envio = Date.now();

    console.log( denuncia );
  }
  
  
  cameraBtnClicked() {

    const cam_config: CameraOptions = {
      correctOrientation: true,
      encodingType:    this.camera.EncodingType.JPEG,
      mediaType:       this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.DATA_URL, // DATA_URL == foto codificada base64
      targetHeight:    1280, // nao ha necessidade da imagem em resoluçao maxima 
      targetWidth:     1280, // obrigatorio definir o outro se um for definido
      quality:         90
    }

    this.camera.getPicture( cam_config ).then( data => {
      // necessário adicionar cabeçalho a data para obter imagem base64 valida
      this.base64img = 'data:image/jpeg;base64,' + data;

    }, error => {
      this.toastCtrl.create({
        message: "Erro ao capturar imagem.",
        duration: 3000
      }).present();
      
    });
  }

}
