import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { FormProductComponent } from './components/form-product/form-product.component';

import { MaterialModule } from './../material/material.module';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

import { UserFormComponent } from './components/user-form/user-form.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { SharedModule } from './../shared/shared.module';
import { UsuariosEditComponent } from './components/usuarios-edit/usuarios-edit.component';

import { FactuacionComponent } from './components/faturacion/facturacion/factuacion.component';
import { AgregaProductoComponent } from './components/faturacion/facturacion/agrega-producto/agrega-producto.component';

import { ListVentasComponent } from './components/list-ventas/list-ventas.component';
import { GiaRemisionComponent } from './components/gia-remision/gia-remision.component';
import { BoletaComponent } from './components/boleta/boleta/boleta.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { ListPedidosComponent } from './components/list-pedidos/list-pedidos.component';
import { ProductosComponent } from './components/products-list/productos/productos.component';
import { ContizacionComponent } from './components/contizacion/contizacion.component';
import { ListContizacionComponent } from './components/list-contizacion/list-contizacion.component';
import { ListComprasComponent } from './components/list-compras/list-compras.component';
import { ComprasComponent } from './components/compras/compras.component';
import { ListComprasProductoComponent } from './components/list-compras-producto/list-compras-producto.component';
import { ListPedidosProductoComponent } from './components/list-pedidos-producto/list-pedidos-producto.component';
import { GoogleChartsModule } from 'angular-google-charts';

import { ReportesService } from './../core/service/reportes/reportes.service';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { ChartsModule } from '@rinminase/ng-charts';
import { ChartmensualComponent } from './components/dashboard/chartmensual/chartmensual.component';
import { ChartdiariaComponent } from './components/dashboard/chartdiaria/chartdiaria.component';
import { ChartdiariausuarioComponent } from './components/dashboard/chartdiariausuario/chartdiariausuario.component';
import { ChartmensualusuarioComponent } from './components/dashboard/chartmensualusuario/chartmensualusuario.component';
import { VentasComponent } from './components/creditos/ventas/ventas.component';
import { CreaditoventasComponent } from './components/creditos/creaditoventas/creaditoventas.component';
import { CreaditocomprasComponent } from './components/creditos/creaditocompras/creaditocompras.component';
import { ComprascComponent } from './components/creditos/comprasc/comprasc.component';
import { PagocComponent } from './components/creditos/comprasc/pagoc/pagoc.component';
import { PagoclistaComponent } from './components/creditos/comprasc/pagoclista/pagoclista.component';
import { NotacreditoComponent } from './components/notacredito/notacredito.component';
import { CierrecajaComponent } from './components/cierrecaja/cierrecaja.component';
import { CorreccionfacturaComponent } from './components/correccionfactura/correccionfactura.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GananciasedeComponent } from './components/gananciasede/gananciasede.component';
import { ListResumenventasComponent } from './components/list-resumenventas/list-resumenventas.component';
import { TrasladosComponent } from './components/traslados/traslados.component';
import { ListTrasladosComponent } from './components/list-traslados/list-traslados.component';
import { ProductsListManComponent } from './components/products-list-man/products-list-man.component';
import { SeriesComponent } from './components/series/series.component';
@NgModule({
  declarations: [
    NavigationComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    ProductsListComponent,
    FormProductComponent,
    ProductEditComponent,

    UserFormComponent,
    UsuariosComponent,
    UsuariosEditComponent,

    FactuacionComponent,
    AgregaProductoComponent,
    ListVentasComponent,
    GiaRemisionComponent,
    BoletaComponent,
    PedidoComponent,
    ListPedidosComponent,
    ProductosComponent,
    ContizacionComponent,
    ListContizacionComponent,
    ListComprasComponent,
    ComprasComponent,
    ListComprasProductoComponent,
    ListPedidosProductoComponent,
    ChartmensualComponent,
    ChartdiariaComponent,
    ChartdiariausuarioComponent,
    ChartmensualusuarioComponent,
    VentasComponent,
    CreaditoventasComponent,
    CreaditocomprasComponent,
    ComprascComponent,
    PagocComponent,
    PagoclistaComponent,
    NotacreditoComponent,
    CierrecajaComponent,
    CorreccionfacturaComponent,
    GananciasedeComponent,
    ListResumenventasComponent,
    TrasladosComponent,
    ListTrasladosComponent,
    ProductsListManComponent,
    SeriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    MaterialModule,
    GoogleChartsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    ChartsModule,
  ],
  providers: [ReportesService],
  entryComponents: [ AgregaProductoComponent,ProductosComponent],
})
export class AdminModule {}
