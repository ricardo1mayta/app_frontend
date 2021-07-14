import { NgModule } from '@angular/core';

import { NavigationComponent } from './components/navigation/navigation.component';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ProductsListComponent } from './components/products-list/products-list.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

import { UserFormComponent } from './components/user-form/user-form.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuariosEditComponent } from './components/usuarios-edit/usuarios-edit.component';

import { FactuacionComponent } from './components/faturacion/facturacion/factuacion.component';
import { ListVentasComponent } from './components/list-ventas/list-ventas.component';
import { GiaRemisionComponent } from './components/gia-remision/gia-remision.component';
import { BoletaComponent } from './components/boleta/boleta/boleta.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { ListPedidosComponent } from './components/list-pedidos/list-pedidos.component';
import { ContizacionComponent } from './components/contizacion/contizacion.component';
import { ListContizacionComponent } from './components/list-contizacion/list-contizacion.component';
import { ComprasComponent } from './components/compras/compras.component';
import { ListComprasComponent } from './components/list-compras/list-compras.component';
import { ListComprasProductoComponent } from './components/list-compras-producto/list-compras-producto.component';
import { ListPedidosProductoComponent } from './components/list-pedidos-producto/list-pedidos-producto.component';
import { CreaditocomprasComponent } from './components/creditos/creaditocompras/creaditocompras.component';
import { ComprascComponent } from './components/creditos/comprasc/comprasc.component';
import { NotacreditoComponent } from './components/notacredito/notacredito.component';
import { CierrecajaComponent } from './components/cierrecaja/cierrecaja.component';
import { CorreccionfacturaComponent } from './components/correccionfactura/correccionfactura.component';
import { GananciasedeComponent } from './components/gananciasede/gananciasede.component';
import { ListResumenventasComponent } from './components/list-resumenventas/list-resumenventas.component';
import { TrasladosComponent } from './components/traslados/traslados.component';
import { ListTrasladosComponent } from './components/list-traslados/list-traslados.component';
import { ProductsListManComponent } from './components/products-list-man/products-list-man.component';
import { SeriesComponent } from './components/series/series.component';
const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'products',
        component: ProductsListComponent,
      },
      {
        path: 'products/create',
        component: FormProductComponent,
      },

      {
        path: 'products/edit/:id',
        component: ProductEditComponent,
      },
      {
        path: 'user',
        component: UsuariosComponent,
      },
      {
        path: 'user/create',
        component: UserFormComponent,
      },
      {
        path: 'user/edit/:id',
        component: UsuariosEditComponent,
      },
      {
        path: 'ventas',
        component: ListVentasComponent,
      },

      {
        path: 'ventas/guiaremision/:serie/:id',
        component: GiaRemisionComponent,
      },
      {
        path: 'factura',
        component: FactuacionComponent,
      },
      {
        path: 'factura/:id',
        component: FactuacionComponent,
      },
      {
        path: 'boleta',
        component: BoletaComponent,
      },
      {
        path: 'boleta/:id',
        component: BoletaComponent,
      },
      {
        path: 'pedido',
        component: PedidoComponent,
      },
      {
        path: 'pedido/:id',
        component: PedidoComponent,
      },
      {
        path: 'pedidos',
        component: ListPedidosComponent,
      },
      {
        path: 'cotizacion',
        component: ContizacionComponent,
      },
      {
        path: 'contizaciones',
        component: ListContizacionComponent,
      },
      {
        path: 'compra',
        component: ComprasComponent,
      },
      {
        path: 'compras',
        component: ListComprasComponent,
      },
      {
        path: 'comprasproductos',
        component: ListComprasProductoComponent,
      },
      {
        path: 'pedidosproductos',
        component: ListPedidosProductoComponent,
      },
      {
        path: 'creditoscompras',
        component: CreaditocomprasComponent,
      },
      {
        path: 'creditoscomprassede/:id',
        component: ComprascComponent,
      },
      {
        path: 'notadecredito/:id',
        component: NotacreditoComponent,
      },
      {
        path: 'cierredecaja',
        component: CierrecajaComponent,
      },
      {
        path: 'correcionfactura/:id',
        component: CorreccionfacturaComponent,
      },
      {
        path: 'gananciasede',
        component: GananciasedeComponent,
      },
      {
        path: 'resumenventas',
        component: ListResumenventasComponent,
      },
      {
        path: 'traslados',
        component: TrasladosComponent,
      },
      {
        path: 'listatraslados',
        component: ListTrasladosComponent,
      },
      {
        path: 'productsMan',
        component: ProductsListManComponent,
      },
      {
        path: 'series/:id',
        component: SeriesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
