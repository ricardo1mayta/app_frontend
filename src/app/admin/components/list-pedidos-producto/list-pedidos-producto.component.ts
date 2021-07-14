import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../core/service/pedidos/pedidos.service';
import { Factura } from '../../../core/models/factura.model';
import { PageEvent } from '@angular/material/paginator';
import { OrdenPDF } from '../../../shared/funciones/ordenCompraPDF';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { environment } from './../../../../environments/environment';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-list-pedidos-producto',
  templateUrl: './list-pedidos-producto.component.html',
  styleUrls: ['./list-pedidos-producto.component.css'],
  providers: [DatePipe],
})
export class ListPedidosProductoComponent implements OnInit {
  facturaPdf = new OrdenPDF();

  ventas: [];
  total = 0;
  environment = environment;
  partida2 = [];
  page = 0;
  pageSize = 10;
  length = 0;
  loading = false;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  fini = '' + this.miDatePipe.transform(new Date(), 'yyyy-MM-dd');
  ffin = '' + this.miDatePipe.transform(new Date(), 'yyyy-MM-dd');
  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    private pedidosService: PedidosService,
    private miDatePipe: DatePipe
  ) {}

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.fini = '' + this.miDatePipe.transform(event.value, 'yyyy-MM-dd');

    this.fetchUsers();
  }
  addEvent2(type: string, event: MatDatepickerInputEvent<Date>) {
    this.ffin = '' + this.miDatePipe.transform(event.value, 'yyyy-MM-dd');

    this.fetchUsers();
  }
  ngOnInit(): void {
    const usr = JSON.parse(localStorage.getItem('user'));
    this.fetchUsers();
  }
  fecha(f) {
    return this.miDatePipe.transform(f, 'dd-MM-yyyy hh:mm:ss');
  }
  fetchUsers() {
    this.loading = true;
    this.pedidosService
      .getPedidosProductoSede(this.fini, this.ffin)
      .subscribe((partida) => {
        //  this.partida = partida;

        this.ventas = JSON.parse(JSON.stringify(partida));
        this.length = this.ventas.length;
        this.total = 0;
        for (let index = 0; index < this.ventas.length; index++) {
          const element = this.ventas[index];
          let preci = JSON.parse(JSON.stringify(element)).txtPRECIO_DET;
          let cant = JSON.parse(JSON.stringify(element)).txtCANTIDAD_DET;
          this.total = this.total + preci * cant;
        }
        this.loading = false;
      });
  }
  onChangePaginate(e: PageEvent) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
  }

  consultadata() {
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
}
