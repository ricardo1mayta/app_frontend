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
interface uMed {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pagoc',
  templateUrl: './pagoc.component.html',
  styleUrls: ['./pagoc.component.css'],
})
export class PagocComponent implements OnInit {
  form: FormGroup;

  stadopublic: tDoc[] = [
    { value: '1', viewValue: 'EFECTIVO' },
    { value: '2', viewValue: 'TRANSFERENCIA ' },
  ];

  medida = '';
  titulo = '';
  constructor(
    public dialogRef: MatDialogRef<PagocComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private productoService: CreditoscomprasService,
    private formBuilder: FormBuilder
  ) {
    this.buiilForm();
  }
  ngOnInit() {
    this.cargarData(this.data);
    this.titulo = this.data.nombre_cliente;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cargarData(data) {
    this.form.patchValue(data);
    console.log(data);
  }
  pagarfraccion() {
    let data = this.form.value;
    this.productoService.pagarfraccion(data).subscribe((partida) => {
      console.log();
    });
  }

  private buiilForm() {
    const usr = JSON.parse(localStorage.getItem('user'));
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      idcompra: ['', [Validators.required]],
      tipo: ['1', [Validators.required]],
      idus: [usr.id, [Validators.required]],
    });
  }
  menssage = '';
}
