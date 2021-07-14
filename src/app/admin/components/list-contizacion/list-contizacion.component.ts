import { Component, OnInit } from '@angular/core';
import { CotizacionesService } from '../../../core/service/cotizaciones/cotizaciones.service';
import { Factura } from '../../../core/models/factura.model';
import { PageEvent } from '@angular/material/paginator';
import { OrdenPDF } from '../../../shared/funciones/cotizacionPDF';

import { environment } from './../../../../environments/environment';

import * as moment from 'moment';

@Component({
  selector: 'app-list-contizacion',
  templateUrl: './list-contizacion.component.html',
  styleUrls: ['./list-contizacion.component.css'],
})
export class ListContizacionComponent implements OnInit {
  facturaPdf = new OrdenPDF();

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

    'actions',
  ];
  constructor(private cotizacionesService: CotizacionesService) {}

  ngOnInit(): void {
    this.fetchUsers();
    const usr = JSON.parse(localStorage.getItem('user'));
  }
  fetchUsers() {
    this.loading = true;
    this.cotizacionesService
      .getCotizacionesSede(this.page, this.pageSize)
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
    this.cotizacionesService
      .deletePedidoId(id)
      .subscribe((red) => console.log(red));
    this.fetchUsers();
  }

  generatePdf(id) {
    this.loading = true;
    const usr = JSON.parse(localStorage.getItem('user'));
    this.cotizacionesService.getPedidoId(id).subscribe((venta) => {
      this.cotizacionesService.getDetallePedidoId(id).subscribe((det) => {
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
}
