import { Component, OnInit, Output, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MyValidators } from './../../../utils/validators';
import { ThemePalette } from '@angular/material/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AgregaProductoComponent } from './../faturacion/facturacion/agrega-producto/agrega-producto.component';
import { DetalleFactura } from './../../../core/models/detalleFactura.model';
import { FormControl } from '@angular/forms';
import { RucService } from './../../.../../../core/service/ruc/ruc.service';
import { NumeroLetras } from '../../../shared/funciones/numeroaletras';
import { FacturaPDF } from '../../../shared/funciones/facturaPDF';
import { Cliente } from './../../../core/models/cliente.model';
import { ProductoService } from './../../.../../../core/service/productos/producto.service';
import { map, startWith } from 'rxjs/operators';
import { ClientesService } from './../../../core/service/clientes/clientes.service';
import { UsuariosService } from './../../../core/service/usuarios/usuarios.service';
interface tDoc {
  value: string;
  viewValue: string;
}
interface sSedes {
  idssede: string;
  nombressede: string;
}
@Component({
  selector: 'app-traslados',
  templateUrl: './traslados.component.html',
  styleUrls: ['./traslados.component.css'],
})
export class TrasladosComponent implements OnInit {
  numeroLetras = new NumeroLetras();
  facturaPdf = new FacturaPDF();
  dataSource: DetalleFactura[] = [];
  form: FormGroup;
  myControl = new FormControl();

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  displayedColumns: string[] = [
    'descripcion',
    'tipoigv',
    'unidadmedida',
    'precio',
    'cantidad',
    'subtotal',
    'igv',
    'importe',
    'actions',
  ];
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
  tipopago: tDoc[] = [
    { value: '01', viewValue: 'Efectivo' },
    { value: '02', viewValue: 'Credito' },
    { value: '03', viewValue: 'Visa' },
    { value: '04', viewValue: 'Tranferencia' },
    { value: '05', viewValue: 'Pago Link' },
    { value: '06', viewValue: 'Efectivo y Visa' },
    { value: '07', viewValue: 'Efectivo y Transferencia' },
    { value: '08', viewValue: 'Efectivo y Pago Link' },
    { value: '09', viewValue: 'Venta Recervada' },
  ];
  serieComprobante: tDoc[] = [
    { value: 'P001', viewValue: 'P001' },
    { value: 'P002', viewValue: 'P002' },
  ];
  tipoDoc: tDoc[] = [
    { value: '1', viewValue: 'DNI' },
    { value: '6', viewValue: 'RUC' },
  ];
  subsedes: sSedes[] = [];
  total = '0';
  igv = '0';
  suttotal = '0';
  descuentos = '0';
  total_letras = '';
  tipo_moneda = 'PEN';
  serieCompro = 'P001';
  tipo_proceso = '2';
  filteredOptions: Observable<Cliente[]>;
  options = [];
  loading = false;
  bntblok = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private rucService: RucService,
    private productoService: ProductoService,
    private clientesService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService
  ) {
    this.buiilForm();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  ngOnInit(): void {
    this.usuariosService.getSubSedes().subscribe((ped) => {
      this.subsedes = JSON.parse(JSON.stringify(ped));
      console.log(ped);
    });

    // console.log(this.numeroLetras.NumeroALetras(1000.25, 'SOLES'));
  }

  cargarData(data) {
    this.form.patchValue(data);
  }
  dosDecimales(n) {
    let t = n.toString();
    let regex = /(\d*.\d{0,2})/;
    return t.match(regex)[0];
  }

  cantidad_edit(e, i) {
    this.dataSource[i].txtCANTIDAD_DET = e.target.value;
  }

  saveUser(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const user = this.form.value;
    }
  }
  changeSuit(e) {
    this.form.get('origen').setValue(e.target.value, {
      onlySelf: true,
    });
  }
  changeSuit2(e) {
    this.form.get('destino').setValue(e.target.value, {
      onlySelf: true,
    });
  }

  private buiilForm() {
    const usr = JSON.parse(localStorage.getItem('user'));
    this.form = this.formBuilder.group({
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],

      sede: [usr.sede, [Validators.required]],
      subsede: [usr.subsede, [Validators.required]],
      idusuario: [usr.id, [Validators.required]],
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AgregaProductoComponent, {
      width: '670px',
      data: [],
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        this.agregaProductos(result);
      },
      (err) => {
        console.log('No hay productos');
      }
    );
  }

  agregaProductos(arr) {
    try {
      let value = Object.values(arr)[0];
      let exits = false;
      for (let i = 0; i < this.dataSource.length; i++) {
        if (this.strNumber(this.dataSource[i].idPRODUCTO) === value) {
          this.openSnackBar('Producto ya Existe!!', 'Cerrar');
          exits = true;
        }
      }
      if (this.dataSource.length === 0 || exits === false) {
        this.dataSource.push(arr);
        this.openSnackBar('Producto Agregado !!', 'Cerrar');
      }
    } catch (error) {
      console.log('error');
    }
  }
  deleteProducto(index: number) {
    this.dataSource.splice(index, 1);
  }
  enviarDocumento() {
    this.loading = true;
    if (this.form.valid) {
      const usr = JSON.parse(localStorage.getItem('user'));
      this.productoService
        .addTraslados({
          ...this.form.value,
          detalle: this.dataSource,
        })
        .subscribe((res) => {
          this.loading = false;
          this.bntblok = true;
          this.router.navigate(['./admin/listatraslados']);
        });
    } else {
      this.loading = false;
      this.openSnackBar('Fantan Datos !!', 'Cerrar');
    }
  }
  strNumber(n) {
    return parseFloat(n);
  }
}
