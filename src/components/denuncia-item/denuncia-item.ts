import { Component, Input } from '@angular/core';
import { Denuncia }  from '../../custom_types/denuncia';
import { DateTime } from 'ionic-angular';

/**
 * Generated class for the DenunciaItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'denuncia-item',
  templateUrl: 'denuncia-item.html'
})
export class DenunciaItemComponent {

  @Input() denuncia: Denuncia;

  constructor() {
    console.log('Hello DenunciaItemComponent Component');
  }

}
