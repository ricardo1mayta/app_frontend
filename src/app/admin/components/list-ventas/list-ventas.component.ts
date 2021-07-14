import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../../core/service/venta/venta.service';
import { Factura } from '../../../core/models/factura.model';
import { PageEvent } from '@angular/material/paginator';
import { FacturaPDF } from '../../../shared/funciones/facturaPDF';
import { GuiaRemisionPDF } from '../../../shared/funciones/guiaremisionPDF';
import { environment } from './../../../../environments/environment';
import { SunatService } from './../../.../../../core/service/sunat/sunat.service';
import * as moment from 'moment';
@Component({
  selector: 'app-list-ventas',
  templateUrl: './list-ventas.component.html',
  styleUrls: ['./list-ventas.component.css'],
})
export class ListVentasComponent implements OnInit {
  facturaPdf = new FacturaPDF();
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
    'xml',
    'estado',
    'guia',
    'actions',
  ];
  constructor(
    private ventaService: VentaService,
    private sunatService: SunatService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers() {
    this.loading = true;
    this.ventaService
      .getVentaSede(this.page, this.pageSize)
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
  eliminardoc() {}
  generatePdf(id) {
    this.loading = true;
    const usr = JSON.parse(localStorage.getItem('user'));

    this.ventaService.getVentaById(id).subscribe((venta) => {
      this.ventaService.getDetalleVentaId(id).subscribe((det) => {
        this.ventaService.getSerieIdVenta(id).subscribe((ser) => {
        let factura = JSON.stringify({
          ...venta,
          emisor: usr.edmisor,
          detalle: det,
          series: ser,
          user: usr,
        });
      

        this.facturaPdf.generatePdf(JSON.parse(factura));
        this.loading = false;
      });
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
              this.loading = false;
              this.fetchUsers();
              console.log(ress);
            });
        });
      });
    });
  }
  convertDateToString(dateToBeConverted: string) {
    return moment(dateToBeConverted, "YYYY-MM-DD HH:mm:ss").format("DD-MMM-YYYY");
    }
}
