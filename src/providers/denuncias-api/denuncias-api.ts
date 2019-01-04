import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DenunciasApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DenunciasApiProvider {

  private get_addr : string = "http://apitesteionic.godocs.com.br/api/ocorrencias/lucas.falcao.nb@gmail.com";
  private post_addr: string = "http://apitesteionic.godocs.com.br/api/ocorrencias/";


  constructor(public http: HttpClient) {
    console.log('Hello DenunciasApiProvider Provider');
  }


  getDenuncias() {
    //
  }


  postDenuncia( denuncia: Object ) {
    //
  }

}
