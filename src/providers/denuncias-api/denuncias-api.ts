import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Denuncia }   from '../../custom_types/denuncia';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the DenunciasApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DenunciasApiProvider {

  private get_addr : string = "http://apitesteionic.godocs.com.br/api/ocorrencias/lucas.falcao.nb@gmail.com";
  // private get_addr : string = "http://apitesteionic.godocs.com.br/api/ocorrencias/dariobennaia@gmail.com/";
  private post_addr: string = "http://apitesteionic.godocs.com.br/api/ocorrencias/";


  constructor(public http: HttpClient) {
    console.log('Hello DenunciasApiProvider Provider');
  }


  getDenuncias () {
    // configuro para receber resposta completa - observe: response - pois vou usar codigos http
    return this.http.get<Denuncia[]>( this.get_addr, { observe: 'response' });
  }


  postDenuncia( denuncia: Denuncia ) {
    //
  }

}
