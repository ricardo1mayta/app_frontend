import { Component, Inject, OnInit, ɵConsole } from '@angular/core';
import { CreditoscomprasService } from './../../../../../core/service/creditoscompras/creditoscompras.service';
import { Producto } from './../../../../../core/models/producto.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from './../../../../../../environments/environment';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface tDoc {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pagoclista',
  templateUrl: './pagoclista.component.html',
  styleUrls: ['./pagoclista.component.css'],
})
export class PagoclistaComponent implements OnInit {
  form: FormGroup;

  stadopublic: tDoc[] = [
    { value: '1', viewValue: 'EFECTIVO' },
    { value: '2', viewValue: 'TRANSFERENCIA ' },
  ];

  medida = '';
  titulo = '';
  abonos = [];
  constructor(
    public dialogRef: MatDialogRef<PagoclistaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private productoService: CreditoscomprasService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.productoService.getAbonos(this.data.idcompra).subscribe((abonos) => {
      this.abonos = JSON.parse(JSON.stringify(abonos));
      console.log(abonos);
    });
  }
}
