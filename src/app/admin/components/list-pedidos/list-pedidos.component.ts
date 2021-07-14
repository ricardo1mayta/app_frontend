import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../core/service/pedidos/pedidos.service';
import { VentaService } from '../../../core/service/venta/venta.service';
import { Factura } from '../../../core/models/factura.model';
import { PageEvent } from '@angular/material/paginator';
import { OrdenPDF } from '../../../shared/funciones/ordenCompraPDF';
import { TiketPDF } from '../../../shared/funciones/tiketPDF';
import { environment } from './../../../../environments/environment';
import { SunatService } from './../../.../../../core/service/sunat/sunat.service';
import { GuiaRemisionPDF } from '../../../shared/funciones/guiaremisionPDF';
import * as moment from 'moment';
@Component({
  selector: 'app-list-pedidos',
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.css'],
})
export class ListPedidosComponent implements OnInit {
  facturaPdf = new OrdenPDF();
  tiketPdf = new TiketPDF();
  guiaPdf = new GuiaRemisionPDF();
  ventas: Factura[] = [];
  environment = environment;
  partida2 = [];
  page = 0;
  pageSize = 10;
  length = 0;
  loading = false;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;
  displayedColumns: string[] = [
    'fecha',
    'comprobante',
    'cliente',
    'ruc',
    'total',
    'pdf',
    'tiket',
    'guia',
    'actions',
  ];
  constructor(
    private pedidosService: PedidosService,
    private sunatService: SunatService,
    private ventaService :VentaService,
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    const usr = JSON.parse(localStorage.getItem('user'));
  }
  fetchUsers() {
    this.loading = true;
    this.pedidosService
      .getPedidosSede(this.page, this.pageSize)
      .subscribe((partida) => {
        //  this.partida = partida;

        const data: Factura[] = Object.values(partida)[0];
        this.ventas = data;
        this.length = Object.values(partida)[2];
        this.loading = false;
      });
  }
  onChangePaginate(e: PageEvent) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
    this.fetchUsers();
  }
  deletePedidos(id) {
    this.pedidosService.deletePedidoId(id).subscribe((red) => console.log(red));
    this.fetchUsers();
  }

  generatePdf(id) {
    this.loading = true;
    const usr = JSON.parse(localStorage.getItem('user'));
    this.pedidosService.getPedidoId(id).subscribe((venta) => {
      this.pedidosService.getDetallePedidoId(id).subscribe((det) => {
        let factura = JSON.stringify({
          ...venta,
          emisor: usr.edmisor,
          detalle: det,
        });

        this.facturaPdf.generatePdf(JSON.parse(factura));
        this.loading = false;
      });
    });
  }
  generateTiketPdf(id) {
    this.loading = true;
    const usr = JSON.parse(localStorage.getItem('user'));
    this.pedidosService.getPedidoId(id).subscribe((venta) => {
      this.pedidosService.getDetallePedidoId(id).subscribe((det) => {
        let factura = JSON.stringify({
          ...venta,
          emisor: usr.edmisor,
          detalle: det,
        });

        this.tiketPdf.generatePdf(JSON.parse(factura));
        this.loading = false;
      });
    });
  }
  
  generateGuiaPdf(id,serie) {
    this.loading = true;
    const usr = JSON.parse(localStorage.getItem('user'));
    this.ventaService.getGuiaRemision(id,serie).subscribe((guia) => {
      this.ventaService.getSerieIdVenta(id).subscribe((ser) => {
        let factura = JSON.stringify({
          ...guia,
          emisor: usr.edmisor,
          series: ser,
          user: usr,
        });
        this.loading = false;
        console.log(JSON.parse(factura));
        this.guiaPdf.generatePdf(JSON.parse(factura));
      });
    });
  }
  convertDateToString(dateToBeConverted: string) {
    return moment(dateToBeConverted, "YYYY-MM-DD HH:mm:ss").format("DD-MMM-YYYY");
    }
}
