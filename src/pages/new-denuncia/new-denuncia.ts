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


  waiting_resp:  boolean = false;
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

    // constroi objecto Denuncia para envio ao serviço web
    let denuncia: Denuncia = {
      email: this.user_email,
      motivo_ocorrencia: this.select_motivo,
      imagem: {
        data_de_envio: Date.now(), 
        imagem: this.base64img
      }
    };

    console.log( denuncia );

    // estado da espera, necessario para customizar interface
    this.waiting_resp = true;

    // TODO
    // salvar foto como arquivo interno
    // caso sucesso, tenta upload do arquivo
    // caso erro, notifica usuario

    this.denunciasApi.postDenuncia( denuncia ).then( resp => {
      // registrado com sucesso, força atualizaçao de dados na HomePage usando
      // a funçao passada por parametro e entao sai da tela de adição
      this.waiting_resp = false;
      this.navParams.get('success_cb')();
      this.navCtrl.pop();

    }, error => {
      // erro ao tentar adicionar, notifica usuario
      console.log( error );

      let msg: string;

      if( error.status === 500 )
        msg = "Estamos passando por problemas, tente novamente mais tarde.";
      else if( error.status === 400 )
        msg = "Você não tem autorização para acessar o servidor de registro.";
      else if( error.status === 404 )
        msg = "Servidor de registro não encontrado, tente novamente mais tarde.";
      else
        msg = "Erro desconhecido. Por favor tente novamente mais tarde.";

      this.waiting_resp = false;
      this.toastCtrl.create({
        message: msg,
        duration: 6000
      }).present();
    });
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
      console.log( error );
    });
  }

}
