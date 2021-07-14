import { Component, Inject, OnInit, ɵConsole } from '@angular/core';
import { UsuariosService } from './../../../../../core/service/usuarios/usuarios.service';
import { ProductoService } from './../../../../../core/service/productos/producto.service';

import { Producto } from './../../../../../core/models/producto.model';
import { DetallePartida } from './../../../../../core/models/detallepartida.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-agrega-producto',
  templateUrl: './agrega-producto.component.html',
  styleUrls: ['./agrega-producto.component.css'],
})
export class AgregaProductoComponent implements OnInit {
  //Declaracion de variables
  form: FormGroup;
  producto: Producto;
  productoNuevo: Producto;
  myControl = new FormControl();
  options = [];
  pers = '';
  filteredOptions: Observable<Producto[]>;
  tipoDoc: tDoc[] = [
    { value: '01', viewValue: 'Grabado' },
    { value: '02', viewValue: 'Exonerado' },
    { value: '03', viewValue: 'Inafecto' },
    { value: '04', viewValue: 'Exportacion' },
    { value: '05', viewValue: 'Gratuitas' },
  ];
  umedida: uMed[] = [
    { value: 'NIU', viewValue: 'UNIDAD (BIENES) ' },
    { value: 'ZZ', viewValue: 'UNIDAD (SERVICIOS) ' },
  ];
  tipoafectacion = '';
  medida = '';
  igv = 1.18;
  preciosinigv = '0';
  subtotal = '0';
  subtotaligv = '0';
  total = '0';
  //Declaracion de variables final
  constructor(
    public dialogRef: MatDialogRef<AgregaProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetallePartida,
    private productoService: ProductoService,

    private formBuilder: FormBuilder
  ) {
    this.buiilForm();
  }
  ngOnInit() {
    
    this.cargarData(this.data);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        return this._filter(value);
      })
    );

    this.productoService.getProductosSede().subscribe((usr) => {
      this.options = Object.values(usr);
    });

    this.form.controls['txtPRECIO_DET'].valueChanges.subscribe((value) => {
      this.calculo();
    });
    this.form.controls['txtCANTIDAD_DET'].valueChanges.subscribe((value) => {
      this.calculo();
    });
  }
  private _filter(value: string): Producto[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => {
      return option.descripcion.toLowerCase().includes(filterValue);
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  cargarData(data) {
    this.form.controls['idPRODUCTO'].setValue(data.id);
    this.form.controls['txtUNIDAD_MEDIDA_DET'].setValue(data.medida);
    this.form.controls['txtCANTIDAD_DET'].setValue('1');
    this.form.controls['txtPRECIO_DET'].setValue(data.preciounitario);

    this.form.controls['txtPRECIO_TIPO_CODIGO'].setValue(data.tipoafetacion);
    this.form.controls['txtCOD_TIPO_OPERACION'].setValue('10');
    this.form.controls['txtCODIGO_DET'].setValue(data.codigo);
    this.form.controls['txtDESCRIPCION_DET'].setValue(data.descripcion);

    this.calculo();

    this.form.patchValue(data);
    this.tipoafectacion = data.tipoafetacion;
    this.medida = '' + data.medida;
  }

  calculo() {
    const precio = this.form.controls['txtPRECIO_DET'].value;
    const cantidad = this.form.controls['txtCANTIDAD_DET'].value;
    this.preciosinigv = (precio / this.igv).toFixed(2);
    //this.subtotal = 0;
    //
    const tt = precio * cantidad;
    this.total = '' + tt.toFixed(2);
    this.subtotal = (tt / this.igv).toFixed(2);
    this.subtotaligv = (tt - tt / this.igv).toFixed(2);
    this.form.controls['txtSUB_TOTAL_DET'].setValue(this.subtotal);

    this.form.controls['txtIGV'].setValue(this.subtotaligv);
    this.form.controls['txtISC'].setValue('0');
    this.form.controls['txtIMPORTE_DET'].setValue(
      parseFloat(this.total) - parseFloat(this.subtotaligv)
    );

    this.form.controls['txtPRECIO_SIN_IGV_DET'].setValue(this.preciosinigv);
  }

  private buiilForm() {
    this.form = new FormGroup({
      idPRODUCTO: new FormControl( '', Validators.required ),
      txtCODIGO_DET: new FormControl( '', Validators.required),
      txtUNIDAD_MEDIDA_DET: new FormControl( '', Validators.required),
      txtDESCRIPCION_DET: new FormControl( '', Validators.required),
      txtPRECIO_DET: new FormControl( '', Validators.required),
      txtCANTIDAD_DET: new FormControl( '1',Validators.required ),
      txtSUB_TOTAL_DET: new FormControl( '', Validators.required),
      txtPRECIO_TIPO_CODIGO: new FormControl( '', Validators.required),
      txtIGV: new FormControl( '', Validators.required),
      txtISC: new FormControl( '', Validators.required),
      txtIMPORTE_DET: new FormControl( '', Validators.required),
      txtCOD_TIPO_OPERACION: new FormControl( '10' ,Validators.required),
      txtPRECIO_SIN_IGV_DET: new FormControl( '', Validators.required),
    });
  }
  menssage = '';
}
