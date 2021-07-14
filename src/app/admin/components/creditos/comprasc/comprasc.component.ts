import { Component, OnInit } from '@angular/core';
import { CreditoscomprasService } from '../../../../core/service/creditoscompras/creditoscompras.service';
import { Factura } from '../../../../core/models/factura.model';
import { PageEvent } from '@angular/material/paginator';
import { OrdenPDF } from '../../../../shared/funciones/ordenCompraPDF';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from './../../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { PagocComponent } from './pagoc/pagoc.component';
import { PagoclistaComponent } from './pagoclista/pagoclista.component';
import * as moment from 'moment';
@Component({
  selector: 'app-comprasc',
  templateUrl: './comprasc.component.html',
  styleUrls: ['./comprasc.component.css'],
})
export class ComprascComponent implements OnInit {
  facturaPdf = new OrdenPDF();

  ventas = [];

  loading = false;

  // MatPaginator Output
  clidoc = '';
  displayedColumns: string[] = [
    'fecha',
    'comprobante',
    'cliente',

    'total',
    'pagado',
    'deuda',

    'actions',
  ];
  constructor(
    private pedidosService: CreditoscomprasService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.clidoc = params.id;
      this.fetchUsers();
    });
  }
  fetchUsers() {
    this.loading = true;
    this.pedidosService
      .getCreditosComprasSede(this.clidoc)
      .subscribe((partida) => {
        this.ventas = JSON.parse(JSON.stringify(partida));

        this.loading = false;
      });
  }

  pagarTodo(id, monto) {
    var r = confirm('Desea pagar todo');
    if (r == true) {
      const usr = JSON.parse(localStorage.getItem('user'));
      let data = {
        descripcion: 'PAGO DEL TOTAL ' + monto,
        monto: monto,
        tipo: '1',
        idcompra: id,
        idus: usr.id,
      };
      this.loading = true;
      this.pedidosService.pagarTodo(data).subscribe((partida) => {
        this.fetchUsers();
        this.loading = false;
      });
    } else {
      console.log();
    }
  }

  openDialog(dt): void {
    console.log(dt);
    const dialogRef = this.dialog.open(PagocComponent, {
      width: '450px',
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
  openDialog2(dt): void {
    console.log(dt);
    const dialogRef = this.dialog.open(PagoclistaComponent, {
      width: '450px',
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
}
