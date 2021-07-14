import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../core/service/productos/producto.service';
import { Factura } from '../../../core/models/factura.model';
import { PageEvent } from '@angular/material/paginator';
import { TiketPDF } from '../../../shared/funciones/invetarioPDF';
import { PresupuestoPDF } from '../../../shared/funciones/presupuestosPDF';
import { Presupuesto2PDF } from '../../../shared/funciones/presupuesto2DPF';
import { Presupuesto3PDF } from '../../../shared/funciones/presupuesto3PDF';
import { Presupuesto4PDF } from '../../../shared/funciones/presupuesto4PDF';
import { sotokPreciosPDF } from '../../../shared/funciones/stockpreciosPDF';
import { ProductosComponent } from './../products-list/productos/productos.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from './../../../../environments/environment';
import { SunatService } from './../../.../../../core/service/sunat/sunat.service';
import * as moment from 'moment';
interface tDoc {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-products-list-man',
  templateUrl: './products-list-man.component.html',
  styleUrls: ['./products-list-man.component.css'],
})
export class ProductsListManComponent implements OnInit {
  inventarioPDF = new TiketPDF();
  presupuestoPDF = new PresupuestoPDF();
  sotokPreciosPDF = new sotokPreciosPDF();
  presupuesto2PDF = new Presupuesto2PDF();
  presupuesto3PDF = new Presupuesto3PDF();
  presupuesto4PDF = new Presupuesto4PDF();
  productos = [];
  environment = environment;
  partida2 = [];
  page = 0;
  pageSize = 1000;
  length = 0;
  loading = false;
  pageSizeOptions: number[] = [5, 10, 25, 100, 1000];

  // MatPaginator Output
  pageEvent: PageEvent;

  tipoafect: tDoc[] = [
    { value: '01', viewValue: 'Grabado' },
    { value: '02', viewValue: 'Exonerado' },
    { value: '03', viewValue: 'Inafecto' },
    { value: '04', viewValue: 'Exportacion' },
    { value: '05', viewValue: 'Gratuitas' },
  ];
  umedida: tDoc[] = [
    { value: 'NIU', viewValue: 'UNIDAD (BIENES) ' },
    { value: 'ZZ', viewValue: 'UNIDAD (SERVICIOS) ' },
  ];
  total = 0;
  rol = 0;
  constructor(
    private productoService: ProductoService,
    private sunatService: SunatService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    const usr = JSON.parse(localStorage.getItem('user'));
    this.rol = usr.rol;
  }
  fetchUsers() {
    this.loading = true;
    this.productoService
      .getAllProductosMan(this.page, this.pageSize)
      .subscribe((partida) => {
        //  this.partida = partida;

        const data: Factura[] = Object.values(partida)[0];
        this.productos = data;
        this.length = Object.values(partida)[2];
        this.loading = false;
        this.total = 0;
        for (let index = 0; index < this.productos.length; index++) {
          const element = JSON.parse(JSON.stringify(this.productos[index]));
          this.total = this.total + element.cantidad * element.preciocompra;
        }
      });
  }
  onChangePaginate(e: PageEvent) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
    this.fetchUsers();
  }

  openDialog(dt): void {
    const dialogRef = this.dialog.open(ProductosComponent, {
      width: '670px',
      data: dt,
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        this.fetchUsers();
      },
      (err) => {
        console.log('No hay productos');
      }
    );
  }

  delete(id) {
    let r = confirm('¿Esta seguro que desea eliminar?');
    if (r == true) {
      this.productoService.deleteProducto(id).subscribe((red) => {
        this.fetchUsers();
        console.log(red);
      });
    }
  }

  invetario() {
    this.productoService.getAllProductos(0, 1000).subscribe((res) => {
      //console.log(JSON.parse(JSON.stringify(res)).data);
      this.inventarioPDF.generatePdf(JSON.parse(JSON.stringify(res)).data);
    });
  }

  presupuesto() {
    const us = JSON.parse(localStorage.getItem('user'));
    // console.log(us.edmisor);
    this.productoService.getAllProductos2(0, 1000).subscribe((res) => {
      //console.log(JSON.parse(JSON.stringify(res)).data);
      let data = { data: res, emisor: us.edmisor, user: us };
      this.presupuestoPDF.generatePdf(JSON.parse(JSON.stringify(data)));
    });
  }
  presupuesto2() {
    const us = JSON.parse(localStorage.getItem('user'));
    this.productoService.getAllProductos2(0, 1000).subscribe((res) => {
      let data = { data: res, emisor: us.edmisor, user: us };
      //console.log(JSON.parse(JSON.stringify(res)).data);
      this.presupuesto2PDF.generatePdf(JSON.parse(JSON.stringify(data)));
    });
  }
  presupuesto3() {
    const us = JSON.parse(localStorage.getItem('user'));
    this.productoService.getAllProductos2(0, 1000).subscribe((res) => {
      let data = { data: res, emisor: us.edmisor, user: us };
      //console.log(JSON.parse(JSON.stringify(res)).data);
      this.presupuesto3PDF.generatePdf(JSON.parse(JSON.stringify(data)));
    });
  }
  presupuesto4() {
    const us = JSON.parse(localStorage.getItem('user'));
    this.productoService.getAllProductos2(0, 1000).subscribe((res) => {
      let data = { data: res, emisor: us.edmisor, user: us };
      //console.log(JSON.parse(JSON.stringify(res)).data);
      this.presupuesto4PDF.generatePdf(JSON.parse(JSON.stringify(data)));
    });
  }
  stopprecio() {
    const us = JSON.parse(localStorage.getItem('user'));
    this.productoService.getAllProductos2(0, 1000).subscribe((res) => {
      let data = { data: res, emisor: us.edmisor };
      //console.log(data);
      this.sotokPreciosPDF.generatePdf(JSON.parse(JSON.stringify(data)));
    });
  }
}
