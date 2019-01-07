import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';
import { DenunciaPostData }   from '../../custom_types/denuncia';

/*
  Generated class for the DenunciasApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DenunciasApiProvider {

  private get_url : string = "http://apitesteionic.godocs.com.br/api/ocorrencias/lucas.falcao.nb@gmail.com";
  private post_url: string = "http://apitesteionic.godocs.com.br/api/ocorrencias";


  constructor( public http: HTTP ) {
    console.log('Hello DenunciasApiProvider Provider');
  }


  getDenuncias () {
    return this.http.get( this.get_url, {}, {} );
  }

  uploadDenuncia( post_data:DenunciaPostData ) {
    console.log( 'DenunciasAPIProvider.uploadDenuncia()' );
    console.log( post_data );

    return this.http.uploadFile( 
      // URL para fazer requisiçao POST
      this.post_url, 
      // campos do formulario POST
      { email: post_data.email, motivo_ocorrencia: post_data.motivo_ocorrencia }, 
      // cabeçalho HTTP adicional
      {}, 
      // caminho do arquivo a ser enviado
      post_data.file_path,
      // nome do campo POST do arquivo
      "imagem" 
    );
  }
}
