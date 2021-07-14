import { Component, Inject, OnInit, ɵConsole } from '@angular/core';
import { UsuariosService } from './../../../../core/service/usuarios/usuarios.service';
import { ProductoService } from './../../../../core/service/productos/producto.service';

import { Producto } from './../../../../core/models/producto.model';
import { DetallePartida } from './../../../../core/models/detallepartida.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from './../../../../../environments/environment';
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
interface tDoc2 {
  value: number;
  viewValue: string;
}
interface uMed {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
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
  categoriaDoc: tDoc2[] = [
    { value: 1, viewValue: 'Celulares' },
    { value: 2, viewValue: 'Accesorios' },
    { value: 3, viewValue: 'Otros' },
  ];
  stadopublic: tDoc[] = [
    { value: 'IN', viewValue: 'Inactivo' },
    { value: 'AC', viewValue: 'Activo' },
  ];
  umedida: uMed[] = [
    { value: 'NIU', viewValue: 'UNIDAD (BIENES) ' },
    { value: 'ZZ', viewValue: 'UNIDAD (SERVICIOS) ' },
  ];
  tipoafectacion = '';
  medida = '';
  categoria = 1;
  igv = 1.18;
  preciosinigv = '0';
  subtotal = '0';
  subtotaligv = '0';
  total = '0';
  titulo = '';
  uploadedFiles: Array<File>;
  filename = '';
  //Declaracion de variables final
  constructor(
    public dialogRef: MatDialogRef<ProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    private productoService: ProductoService,

    private formBuilder: FormBuilder
  ) {
    this.buiilForm();
  }
  usr;
  ngOnInit() {
    this.cargarData(this.data);
    this.titulo = this.data.codigo;
    const usr = JSON.parse(localStorage.getItem('user'));
    this.usr = usr;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        return this._filter(value);
      })
    );

    this.productoService.getProductosSede().subscribe((usr) => {
      this.options = Object.values(usr);
    });
  }
  fileChange(element) {
    this.uploadedFiles = element.target.files;
    this.upload();
  }

  upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append(
        'uploads[]',
        this.uploadedFiles[i],
        this.uploadedFiles[i].name
      );
    }
    this.productoService.uploadFile(formData).subscribe((res) => {
      let filepath = JSON.parse(JSON.stringify(res));
      this.filename =
        environment.url_apiSunat + '/img/' + filepath.path.split('/')[5];

      this.form.controls['imagen'].setValue(this.filename);
      this.form.controls['img1'].setValue(this.filename);
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
  idpro = 0;
  cargarData(data) {
    this.form.patchValue(data);
    console.log(data);
    this.idpro = data.id;
    this.tipoafectacion = data.tipoafetacion;
    this.medida = '' + data.medida;
  }

  nuevo() {
    const usr = JSON.parse(localStorage.getItem('user'));
    this.form.controls['sede'].setValue('' + usr.sede);
    this.form.controls['subsede'].setValue('' + usr.subsede);
    this.form.controls['idusercreate'].setValue('' + usr.id);
    if (this.idpro) {
      this.productoService
        .updateProducto2(this.idpro, this.form.value)
        .subscribe((prod) => {});
    } else {
      this.productoService
        .addProducto2(this.form.value)
        .subscribe((product) => {
          this.menssage = product[0][0].sms;
        });
    }
  }
  private buiilForm() {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      categoria: ['1'],
      imagen: [''],
      preciocompra: [0],
      preciounitario: [0, [Validators.required]],
      codigo: [''],
      sku: [''],
      medida: [''],
      cantidad: [''],
      tipoafetacion: [''],
      idusercreate: [''],
      sede: [''],
      subsede: [''],
      precio1: [0],
      precio2: [0],
      precio3: [0],
      descc: [''],
      descl: [''],
      img1: [''],
      img2: [''],
      img3: [''],
      img4: [''],
      id: [''],
      statuspublic: ['IN'],
    });
  }
  menssage = '';
}
