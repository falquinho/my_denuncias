import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewDenunciaPage } from '../new-denuncia/new-denuncia';
import { DenunciasApiProvider } from '../../providers/denuncias-api/denuncias-api';
import { Denuncia } from '../../custom_types/denuncia';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  denuncias: Denuncia[] = undefined;
  http_code: number     = 0;


  constructor(
    public  navCtrl:     NavController, 
    private denunciaApi: DenunciasApiProvider
  ) {}


  ionViewDidLoad() {
    // ao abrir tela apenas busca dados se necessario, economiza banda
    // e faz o app parecer mais rapido
    if( !this.denuncias )
      this.getDenunciasFromApi();  
      
  }
    
    
  getDenunciasFromApi() {
    // ao iniciar busca reseta o estado dos dados
    this.http_code = undefined;
    this.denuncias = undefined;

    this.denunciaApi.getDenuncias().then( response => {
      this.denuncias = response.data;
      this.http_code = response.status;

    }, error => {
      // reduzo todos os erros ao 500 ja que para o usuario final nao importa
      // e assim evito conflito com o codigo 0, o estado inicial da variavel
      this.http_code = 500; 
      this.denuncias = undefined;
    });
  }


  fabClicked() {
    // passo funçao de recuperar dados da API para a NewDenunciaPage, assim ela pode
    // forçar a atualizaçao dos dados aqui na HomePage em caso de sucesso
    this.navCtrl.push( NewDenunciaPage, { success_cb: () => { this.getDenunciasFromApi() } });
  }

}
