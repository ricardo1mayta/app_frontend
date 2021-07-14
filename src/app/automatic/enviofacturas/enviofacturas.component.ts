import { Component, OnInit } from '@angular/core';
import { EnviofacturasService } from '../../core/service/automatic/enviofacturas.service';

import { PageEvent } from '@angular/material/paginator';
import { FacturaPDF } from '../../shared/funciones/facturaPDF';

import { environment } from './../../../environments/environment';
import { SunatService } from './../../.../../core/service/sunat/sunat.service';
@Component({
  selector: 'app-enviofacturas',
  templateUrl: './enviofacturas.component.html',
  styleUrls: ['./enviofacturas.component.css'],
})
export class EnviofacturasComponent implements OnInit {
  facturaPdf = new FacturaPDF();

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
    private ventaService: EnviofacturasService,
    private sunatService: SunatService
  ) {}

  ngOnInit(): void {
    for (let index = 0; index < 50; index++) {
      this.fetchUsers();
    }
  }
  fetchUsers() {
    this.loading = true;
    this.ventaService.getventas().subscribe((partida) => {
      //  this.partida = partida;
      const data = JSON.parse(JSON.stringify(partida));
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        this.ventaService.getSedes(element.sede).subscribe((emi) => {
          this.ventaService.getDetalleVentaId(element.id).subscribe((det) => {
            let factura = { ...element, emisor: emi[0], detalle: det };
            this.sunatService
              .envioFactura(JSON.parse(JSON.stringify(factura)))
              .subscribe((rr) => {
                this.ventaService
                  .respuestaSunat({
                    ...rr,
                    iddocumento: element.id,
                    idUser: 0,
                    tipocomprobante: 'F',
                  })
                  .subscribe((ress) => {
                    console.log(ress);
                  });
              });
          });
        });
      }
    });
  }
  onChangePaginate(e: PageEvent) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
    this.fetchUsers();
  }
  eliminardoc() {}

  renviarDocumento(idventa) {
    this.loading = true;

    const usr = JSON.parse(localStorage.getItem('user'));
    /*
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
    });*/
  }
}
