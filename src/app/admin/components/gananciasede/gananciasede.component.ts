import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../core/service/reportes/reportes.service';
import { Factura } from '../../../core/models/factura.model';
import { PageEvent } from '@angular/material/paginator';
import { OrdenPDF } from '../../../shared/funciones/ordenCompraPDF';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { environment } from './../../../../environments/environment';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-gananciasede',
  templateUrl: './gananciasede.component.html',
  styleUrls: ['./gananciasede.component.css'],
  providers: [DatePipe],
})
export class GananciasedeComponent implements OnInit {
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
    private pedidosService: ReportesService,
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
      .ganaciasSede(this.fini, this.ffin)
      .subscribe((partida) => {
        //  this.partida = partida;

        this.ventas = JSON.parse(JSON.stringify(partida));

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
}
