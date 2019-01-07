import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DenunciasApiProvider } from '../../providers/denuncias-api/denuncias-api';
import { DenunciaPostData } from '../../custom_types/denuncia';
import { File } from '@ionic-native/file';

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
    private denunciasApi: DenunciasApiProvider,
    private file: File
  ) {}
    
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewDenunciaPage');
  }
  
  
  submitBtnClicked() {

    // validação de dados: basta checar se foto foi capturada
    if( !this.base64img ) {
      this.toastCtrl.create({
        message: "Por favor capture uma foto.",
        duration: 3000
      }).present();

      return;
    }

    // estado da espera, necessario para customizar interface
    this.waiting_resp = true;

    // objeto imagem que sera salvo como arquivo JSON
    let imagem = {
      data_de_envio: Date.now(),
      imagem:        this.base64img
    }

    // tenta salvar imagem no arquivo foto1.json como especificado
    // porque cacheDirectory: multiplataforma, evito necessidade de checar OS,
    // e porque o arquivo basta existir tempo suficiente para o upload
    this.file.writeFile( this.file.cacheDirectory, "foto1.json", JSON.stringify( imagem ), { replace: true })
    .then( resp => {
      // foto salva localmente, posso tentar fazer upload para serviço web
      console.log( 'file.writeFile().then' );
      console.log( resp );

      let post_data: DenunciaPostData = {
        email:             this.user_email,
        motivo_ocorrencia: this.select_motivo,
        file_path:         resp.nativeURL
      };

      this.denunciasApi.uploadDenuncia( post_data )
      .then( resp => this.onDenunciaUploadSuccess( resp ))
      .catch( error => this.onDenunciaUploadError( error ));

    })
    .catch( error => {
      // se nao consegue salvar o arquivo, cancela toda a operação
      console.log( error );

      this.toastCtrl.create({ 
        message: "Ocorreu um erro ao salvar foto na memória interna.", 
        duration: 3000 
      }).present();
    });

  }
  
  
  onDenunciaUploadSuccess( result ) {
    // sucesso ao fazer upload/POST da foto de denuncia, invoca callback
    // para atualizar a HomePage e faz pop da navegação para sair da tela de adição
    console.log( result );
    
    this.navParams.get('success_cb')();
    this.navCtrl.pop();
  }
  
  
  onDenunciaUploadError( error ) {
    console.log( error );

    this.waiting_resp = false;

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
