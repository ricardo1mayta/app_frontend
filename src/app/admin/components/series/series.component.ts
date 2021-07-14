
import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../../../core/service/compras/compras.service';
import { Factura } from '../../../core/models/factura.model';
import { PageEvent } from '@angular/material/paginator';
import { OrdenPDF } from '../../../shared/funciones/ordenCompraPDF';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { VentaService } from 'src/app/core/service/venta/venta.service'; 
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import {MatChipInputEvent} from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
interface Series {
  iddetventa: string;
  idproducto: string;
  serie: string;
}
@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  
  id ; 
  seriecomp;  
  detalle = []; 
  loading = false;
  series: Series[] = [];
  // MatPaginator Output
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private ventaService: VentaService, private activatedRoute: ActivatedRoute, private _snackBar: MatSnackBar,) {}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  ngOnInit(): void {
    this.fetchUsers();
    const usr = JSON.parse(localStorage.getItem('user'));
  }
  fetchUsers() {
    this.loading = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.seriecomp = params.serie;
      
    
    this.loading = true;
    this.ventaService.getDetalleVentaId(this.id).subscribe((partida) => {
      console.log(partida)
        this.detalle = JSON.parse(JSON.stringify(partida)) ;
        this.ventaService.getSerieIdVenta(this.id).subscribe((g) => {
          let ser = JSON.parse(JSON.stringify(g));
          for (let i = 0; i < ser.length; i++) {
            this.series.push({
              iddetventa: ser[i].iddetventa,
              idproducto: ser[i].idprodcuto,
              serie: ser[i].serie,
              
            });
          }

          this.loading = false;
        });
       
        console.log(this.series)
        //this.loading = false;
      });
    });
  }
 
 
  visible = true;
  selectable = true;
  removable = true;
  strNumber(n) {
    return parseInt(n);
  }

  add(event, idpro, idvent, cant): void {
    event.stopPropagation();
    const value = event.target.value;
    let cn = 0;
    try {
      let exits = false;
      for (let i = 0; i < this.series.length; i++) {
        if (this.series[i].idproducto === idpro) {
          cn++;
        }

        if (this.series[i].serie === value) {
          this.openSnackBar('Producto ya Existe!!', 'Cerrar');
          exits = true;
        }
      }

      if (
        this.series.length === 0 ||
        (exits === false && cn < cant && value !== ' ' && value !== '')
      ) {
        this.series.push({
          iddetventa: idvent,
          idproducto: idpro,
          serie: value,
        });
        this.openSnackBar('Producto Agregado !!', 'Cerrar');
      }
    } catch (error) {
      console.log('error');
    }
    event.target.value = '';
  
    console.log(this.series);
  }
  remove(index: number): void {
    this.series.splice(index, 1);
  }
  actualizarSeries() {
    this.loading = true;
    const usr = JSON.parse(localStorage.getItem('user'));
    if (this.series.length > 0) {
      this.ventaService.addSerie(this.series).subscribe((r) => {
        console.log(r);
        this.loading = false;
      });
    }
   
  }

  
  }

