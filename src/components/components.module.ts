import { NgModule } from '@angular/core';
import { LoadingDenunciaComponent } from './loading-denuncia/loading-denuncia';
import { DenunciaItemComponent } from './denuncia-item/denuncia-item';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [LoadingDenunciaComponent,
    DenunciaItemComponent],
	imports: [CommonModule],
	exports: [LoadingDenunciaComponent,
    DenunciaItemComponent]
})
export class ComponentsModule {}
