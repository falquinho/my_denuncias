import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';
import { Denuncia }   from '../../custom_types/denuncia';

/*
  Generated class for the DenunciasApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DenunciasApiProvider {

  private get_url : string = "http://apitesteionic.godocs.com.br/api/ocorrencias/lucas.falcao.nb@gmail.com";
  private post_url: string = "http://apitesteionic.godocs.com.br/api/ocorrencias";


  constructor(
    private http: HTTP
  ) {
    console.log('Hello DenunciasApiProvider Provider');
  }


  getDenuncias () {
    return this.http.get( this.get_url, {}, {} );
  }


  postDenuncia( denuncia: Denuncia ) {
    return this.http.post( this.post_url, denuncia, {} );
  }

}
