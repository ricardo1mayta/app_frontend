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
import { ComprasService } from './../../.../../../core/service/compras/compras.service';
import { map, startWith } from 'rxjs/operators';
import { ProvedoresService } from './../../../core/service/provedores/provedores.service';
import { CotizacionesService } from './../../../core/service/cotizaciones/cotizaciones.service';
interface tDoc {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})
export class ComprasComponent implements OnInit {
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
  ];
  serieComprobante: tDoc[] = [
    { value: 'COM1', viewValue: 'COM1' },
    { value: 'COM2', viewValue: 'COM2' },
  ];
  tipoDoc: tDoc[] = [
    { value: '1', viewValue: 'DNI' },
    { value: '6', viewValue: 'RUC' },
  ];
  total = '0';
  igv = '0';
  suttotal = '0';
  descuentos = '0';
  total_letras = '';
  tipo_moneda = 'PEN';
  serieCompro = 'COM1';
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
    private pedidosService: ComprasService,
    private clientesService: ProvedoresService,
    private activatedRoute: ActivatedRoute,
    private cotizacionesService: CotizacionesService
  ) {
    this.buiilForm();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      let idpedido = params.id;
      if (idpedido > 0) {
        console.log(params.id);
        this.cotizacionesService.getPedidoId(idpedido).subscribe((ped) => {
          this.cotizacionesService
            .getDetallePedidoId(idpedido)
            .subscribe((det) => {
              this.form.patchValue(ped);
              this.form.controls['serie_comprobante'].setValue(
                this.serieCompro
              );
              let ddd = JSON.parse(JSON.stringify(det));
              for (let i = 0; i < ddd.length; i++) {
                this.dataSource.push(ddd[i]);
              }
              this.calculototales();
            });
        });
      }
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        return this._filter(value);
      })
    );
    this.clientesService.getClientesSede().subscribe((usr) => {
      this.options = Object.values(usr);
    });

    const usr = JSON.parse(localStorage.getItem('user'));

    this.tipo_proceso = '' + usr.edmisor.tipo_proceso;
    this.form.controls['serie_comprobante'].setValue(this.serieCompro);
    this.form.controls['condicionpago'].setValue('01');

    this.form.controls['sede'].setValue('' + usr.sede);
    this.form.controls['subsede'].setValue('' + usr.subsede);
    this.form.controls['idusuario'].setValue('' + usr.id);
    this.form.controls['tipo_proceso'].setValue(this.tipo_proceso);

    // console.log(this.numeroLetras.NumeroALetras(1000.25, 'SOLES'));
  }
  private _filter(value: string): Cliente[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => {
      return option.cliente_numerodocumento.toLowerCase().includes(filterValue);
    });
  }
  cargarData(data) {
    this.form.patchValue(data);
  }
  dosDecimales(n) {
    let t = n.toString();
    let regex = /(\d*.\d{0,2})/;
    return t.match(regex)[0];
  }

  buscarRuc(e) {
    const doc = this.form.controls['cliente_numerodocumento'].value;
    const tipodocumento = this.form.controls['cliente_tipodocumento'].value;
    if (doc.length === 8 && tipodocumento === '1') {
      this.rucService.getDni(doc).subscribe(
        (res) => {
          const data = JSON.parse(JSON.stringify(res));

          if (data.success) {
            this.form.controls['cliente_nombre'].setValue(data.nombre);
            this.form.controls['cliente_pais'].setValue('PE');
          }
        },
        (err) => {
          this.form.controls['cliente_nombre'].setValue('');
          this.form.controls['cliente_pais'].setValue('');
          this.openSnackBar('No existe !!', 'Cerrar');
        }
      );
    } else if (doc.length === 11 && tipodocumento === '6') {
      this.rucService.getRuc(doc).subscribe(
        (res) => {
          const data = JSON.parse(JSON.stringify(res));

          if (data.success && data.estado_del_contribuyente === 'ACTIVO') {
            this.form.controls['cliente_nombre'].setValue(
              data.nombre_o_razon_social
            );
            this.form.controls['cliente_direccion'].setValue(data.direccion);
            this.form.controls['cliente_codigoubigeo'].setValue(data.ubigeo);
            this.form.controls['cliente_pais'].setValue('PE');
            this.form.controls['cliente_ciudad'].setValue(data.distrito);
            //console.log(data);
          } else {
            this.openSnackBar('' + data.estado_del_contribuyente, 'Cerrar');
          }
        },
        (err) => {
          this.form.controls['cliente_nombre'].setValue('');
          this.form.controls['cliente_direccion'].setValue('');
          this.form.controls['cliente_codigoubigeo'].setValue('');
          this.form.controls['cliente_pais'].setValue('');
          this.form.controls['cliente_ciudad'].setValue('');
          this.openSnackBar('No existe !!', 'Cerrar');
        }
      );
    } else {
      this.openSnackBar('No Documento no valido !!', 'Cerrar');
    }
  }

  cantidad_edit(e, i) {
    this.dataSource[i].txtCANTIDAD_DET = e.target.value;
    this.calculoRow(i);
    this.calculototales();
  }
  precio_edit(e, i) {
    this.dataSource[i].txtPRECIO_DET = e.target.value;
    this.calculoRow(i);
    this.calculototales();
  }
  calculoRow(i) {
    const precio = parseFloat(this.dataSource[i].txtPRECIO_DET);
    const cantidad = parseFloat(this.dataSource[i].txtCANTIDAD_DET);
    const tt = precio * cantidad;
    let total = '' + tt.toFixed(2);
    let subtotal = (tt / 1.18).toFixed(2);
    let subtotaligv = (tt - tt / 1.18).toFixed(2);

    this.dataSource[i].txtSUB_TOTAL_DET = subtotal;
    this.dataSource[i].txtIGV = subtotaligv;
    this.dataSource[i].txtIMPORTE_DET = subtotal;
  }
  saveUser(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const user = this.form.value;
    }
  }
  calculototales() {
    let tt = 0;
    this.descuentos = this.form.controls['total_descuento'].value;
    if (parseInt(this.descuentos) >= 0) {
      if (this.dataSource.length >= 0) {
        for (let i = 0; i < this.dataSource.length; i++) {
          tt =
            tt +
            parseFloat(this.dataSource[i].txtPRECIO_DET) *
              parseFloat(this.dataSource[i].txtCANTIDAD_DET);
        }

        this.total = (tt - parseFloat(this.descuentos)).toFixed(2);

        this.suttotal = (tt / 1.18).toFixed(2);
        this.igv = (
          parseFloat(this.total) -
          parseFloat(this.total) / 1.18
        ).toFixed(2);
        this.total_letras =
          'SON ' +
          this.numeroLetras.NumeroALetras(parseFloat(this.total), 'SOLES');
        //console.log('total', tt);
        this.form.controls['total_gravadas'].setValue(this.suttotal);
        this.form.controls['sub_total'].setValue(this.suttotal);
        this.form.controls['total_igv'].setValue(this.igv);
        this.form.controls['total'].setValue(this.total);
        this.form.controls['total_letras'].setValue(this.total_letras);
        this.form.controls['cod_moneda'].setValue(this.tipo_moneda);
      }
    }
  }
  changeSuit(e) {
    this.form.get('cliente_tipodocumento').setValue(e.target.value, {
      onlySelf: true,
    });
  }
  private buiilForm() {
    this.form = this.formBuilder.group({
      total_gravadas: ['', [Validators.required]],
      total_descuento: ['0'],
      sub_total: ['', [Validators.required]],
      total_igv: ['', [Validators.required]],
      total: ['', [Validators.required]],
      total_letras: ['', [Validators.required]],
      cod_tipo_documento: ['03', [Validators.required]],
      cod_moneda: ['', [Validators.required]],
      cliente_numerodocumento: ['', [Validators.required]],
      cliente_nombre: ['', [Validators.required]],
      cliente_tipodocumento: ['', [Validators.required]],
      cliente_direccion: ['', [Validators.required]],
      cliente_codigoubigeo: ['', [Validators.required]],
      cliente_pais: ['', [Validators.required]],
      cliente_ciudad: ['', [Validators.required]],
      serie_comprobante: ['', [Validators.required]],
      tipo_proceso: ['', [Validators.required]],
      guia: [''],
      sede: ['', [Validators.required]],
      subsede: ['', [Validators.required]],
      idusuario: ['', [Validators.required]],
      condicionpago: ['', [Validators.required]],
      observacion: [''],
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
        this.calculototales();
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
    this.calculototales();
  }
  enviarDocumento() {
    this.loading = true;
    if (this.form.valid) {
      const usr = JSON.parse(localStorage.getItem('user'));
      this.pedidosService
        .createCompra({
          ...this.form.value,
          detalle: this.dataSource,
        })
        .subscribe((res) => {
          this.loading = false;
          this.bntblok = true;
          this.router.navigate(['./admin/compras']);
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
