import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ExponentialPipe } from './pipes/exponential/exponential.pipe';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { MaterialModule } from './../material/material.module';
import { PintarbolillaPipe } from './pipes/bingo/pintarbolilla.pipe';

import { RolPipe } from './pipes/usuarios/rol.pipe';
import { EstadoPipe } from './pipes/usuarios/estado.pipe';
import { PaginantePipe } from './pipes/paginate/paginante.pipe';
import { MedidaPipe } from './pipes/facturacion/medida.pipe';
import { DecimalesPipe } from './pipes/facturacion/decimales.pipe';
import { SerieparentPipe } from './pipes/facturacion/serieparent.pipe';
@NgModule({
  declarations: [
    ExponentialPipe,
    HighlightDirective,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    PintarbolillaPipe,

    RolPipe,
    EstadoPipe,
    PaginantePipe,
    MedidaPipe,
    DecimalesPipe,
    SerieparentPipe,
  ],
  exports: [
    ExponentialPipe,
    RolPipe,
    EstadoPipe,
    PaginantePipe,
    HighlightDirective,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    MedidaPipe,
    DecimalesPipe,
    SerieparentPipe,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, ReactiveFormsModule],
})
export class SharedModule {}
