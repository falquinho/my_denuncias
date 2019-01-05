import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello DenunciaItemComponent Component');
    this.text = 'Hello World';
  }

}
