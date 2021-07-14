import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../../core/service/venta/venta.service';
import { Factura } from '../../../core/models/factura.model';
import { PageEvent } from '@angular/material/paginator';
import { FacturaPDF } from '../../../shared/funciones/facturaPDF';
import { GuiaRemisionPDF } from '../../../shared/funciones/guiaremisionPDF';
import { environment } from './../../../../environments/environment';
import { SunatService } from './../../.../../../core/service/sunat/sunat.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { ExportService } from './../../../core/service/exportexcel/export.service';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-list-resumenventas',
  templateUrl: './list-resumenventas.component.html',
  styleUrls: ['./list-resumenventas.component.css'],
})
export class ListResumenventasComponent implements OnInit {
  data: any = [];
  form: FormGroup;
  mes: Food[] = [
    { value: '01', viewValue: 'ENERO' },
    { value: '02', viewValue: 'FEBRERO' },
    { value: '03', viewValue: 'MARZO' },
    { value: '04', viewValue: 'ABRIL' },
    { value: '05', viewValue: 'MAYO' },
    { value: '06', viewValue: 'JUNIO' },
    { value: '07', viewValue: 'JULIO' },
    { value: '08', viewValue: 'AGOSTO' },
    { value: '09', viewValue: 'SEPTIEMBRE' },
    { value: '10', viewValue: 'OCTUBRE' },
    { value: '11', viewValue: 'NOVIEMBRE' },
    { value: '12', viewValue: 'DICIEMBRE' },
  ];
  ano: Food[] = [
    { value: '2020', viewValue: '2020' },
    { value: '2021', viewValue: '2021' },
    { value: '2022', viewValue: '2022' },
    { value: '2023', viewValue: '2023' },
    { value: '2024', viewValue: '2024' },
    { value: '2025', viewValue: '2025' },
    { value: '2026', viewValue: '2026' },
    { value: '2027', viewValue: '2027' },
    { value: '2028', viewValue: '2028' },
    { value: '2029', viewValue: '2029' },
    { value: '2030', viewValue: '2030' },
  ];
  hoy = new Date();
  mesControl = new FormControl('' + this.hoy.getMonth());
  anoControl = new FormControl('' + this.hoy.getFullYear());

  ventas: Factura[] = [];

  loading = false;
  total = 0;

  // MatPaginator Output
  pageEvent: PageEvent;
  displayedColumns: string[] = [
    'fecha',
    'comprobante',
    'cliente',
    'ruc',
    'total',
  ];
  constructor(
    private ventaService: VentaService,
    private sunatService: SunatService,
    private excelService: ExportService
  ) {
    this.form = new FormGroup({
      mes: this.mesControl,
      ano: this.anoControl,
    });
  }

  ngOnInit(): void {
    const hoy = new Date();
    this.fetchUsers('' + hoy.getFullYear(), '' + hoy.getMonth());
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'facturacion');
  }
  fetchUsers(anno, mess) {
    const usr = JSON.parse(localStorage.getItem('user'));
    this.loading = true;
    this.ventaService
      .getResumenVenta(usr.sede, anno, mess)
      .subscribe((partida) => {
        //  this.partida = partida;

        const data: Factura[] = Object.values(partida);
        this.ventas = data;
        this.data = this.ventas;
        this.total = 0;
        for (let index = 0; index < this.ventas.length; index++) {
          this.total = this.total + Number(this.ventas[index].total);
        }
        this.loading = false;
      });
  }
  mostrar() {
    const anno = this.anoControl.value;
    const mess = this.mesControl.value;

    this.fetchUsers(anno, mess);
  }
  /*name of the excel-file which will be downloaded. */
}
