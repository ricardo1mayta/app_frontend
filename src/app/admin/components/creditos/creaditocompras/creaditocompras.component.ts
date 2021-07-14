import { Component, OnInit } from '@angular/core';
import { CreditoscomprasService } from '../../../../core/service/creditoscompras/creditoscompras.service';
import { Factura } from '../../../../core/models/factura.model';
import { PageEvent } from '@angular/material/paginator';
import { OrdenPDF } from '../../../../shared/funciones/ordenCompraPDF';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from './../../../../../environments/environment';
import { SunatService } from './../../../.../../../core/service/sunat/sunat.service';
import * as moment from 'moment';
@Component({
  selector: 'app-creaditocompras',
  templateUrl: './creaditocompras.component.html',
  styleUrls: ['./creaditocompras.component.css'],
})
export class CreaditocomprasComponent implements OnInit {
  facturaPdf = new OrdenPDF();

  ventas = [];
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
    'cliente',
    'ruc',
    'total',
    'pagado',
    'deuda',
    'actions',
  ];
  constructor(
    private pedidosService: CreditoscomprasService,
    private sunatService: SunatService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    const usr = JSON.parse(localStorage.getItem('user'));
  }
  fetchUsers() {
    this.loading = true;
    this.pedidosService.getCreditosCompras().subscribe((partida) => {
      this.ventas = JSON.parse(JSON.stringify(partida));

      this.loading = false;
    });
  }
  onChangePaginate(e: PageEvent) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
    this.fetchUsers();
  }
  /*
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
  }*/
  /*
  generateGuiaPdf(id) {
    this.loading = true;
    const usr = JSON.parse(localStorage.getItem('user'));
    this.ventaService.getGuiaRemision(id).subscribe((guia) => {
      this.ventaService.getSerieIdVenta(id).subscribe((ser) => {
        let factura = JSON.stringify({
          ...guia,
          emisor: usr.edmisor,
          series: ser,
        });

        this.loading = false;
        console.log(JSON.parse(factura));
        this.guiaPdf.generatePdf(JSON.parse(factura));
      });
    });
  }
  renviarDocumento(idventa) {
    this.loading = true;

    const usr = JSON.parse(localStorage.getItem('user'));

    this.ventaService.getVentaById(idventa).subscribe((res) => {
      this.ventaService.getDetalleVentaId(idventa).subscribe((det) => {
        let factura = JSON.stringify({
          ...res,
          emisor: usr.edmisor,
          detalle: det,
        });

        this.sunatService.envioFactura(JSON.parse(factura)).subscribe((rr) => {
          this.ventaService
            .respuestaSunat({
              ...rr,
              iddocumento: idventa,
              idUser: usr.id,
              tipocomprobante: 'F',
            })
            .subscribe((ress) => {
              this.loading = false;
              this.fetchUsers();
              console.log(ress);
            });
        });
      });
    });
  }
  enviarDocumentob(idventa) {
    this.loading = true;
    const usr = JSON.parse(localStorage.getItem('user'));
    this.ventaService.getVentaById(idventa).subscribe((res) => {
      this.ventaService.getDetalleVentaId(idventa).subscribe((det) => {
        let factura = JSON.stringify({
          ...res,
          emisor: usr.edmisor,
          detalle: det,
          tipocomprobante: 'B',
          iddocumento: idventa,
          idUser: usr.id,
        });
        console.log(factura);
        this.sunatService.envioBoleta(factura).subscribe((rr) => {
          this.ventaService
            .respuestaSunat({
              ...rr,
              iddocumento: idventa,
              idUser: usr.id,
              tipocomprobante: 'B',
            })
            .subscribe((ress) => {
              this.loading = true;
              this.fetchUsers();
              console.log(ress);
            });
        });
      });
    });
  }*/
}
