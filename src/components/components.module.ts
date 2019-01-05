import { NgModule } from '@angular/core';
import { LoadingDenunciaComponent } from './loading-denuncia/loading-denuncia';
import { DenunciaItemComponent } from './denuncia-item/denuncia-item';
@NgModule({
	declarations: [LoadingDenunciaComponent,
    DenunciaItemComponent],
	imports: [],
	exports: [LoadingDenunciaComponent,
    DenunciaItemComponent]
})
export class ComponentsModule {}
