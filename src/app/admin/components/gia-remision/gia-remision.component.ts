import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MyValidators } from './../../../utils/validators';
import { ThemePalette } from '@angular/material/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { GuiaDetalle } from './../../../core/models/guiadetalle.model';
import { FormControl } from '@angular/forms';
import { RucService } from './../../.../../../core/service/ruc/ruc.service';
import { NumeroLetras } from '../../../shared/funciones/numeroaletras';
import { FacturaPDF } from '../../../shared/funciones/facturaPDF';
import { SunatService } from './../../../core/service/sunat/sunat.service';
import { VentaService } from './../../../core/service/venta/venta.service';
import { GuiaRemision } from './../../../core/models/guiaremision.model';

interface tDoc {
  value: string;
  viewValue: string;
}

interface Series {
  iddetventa: string;
  idproducto: string;
  serie: string;
}

@Component({
  selector: 'app-factuacion',
  templateUrl: './gia-remision.component.html',
  styleUrls: ['./gia-remision.component.css'],
})
export class GiaRemisionComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  numeroLetras = new NumeroLetras();
  facturaPdf = new FacturaPDF();
  dataSource: GuiaDetalle[] = [];
  form: FormGroup;
  myControl = new FormControl();

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  tipodocumento = '6';

  umedida: tDoc[] = [
    { value: 'NIU', viewValue: 'UNIDAD (BIENES) ' },
    { value: 'ZZ', viewValue: 'UNIDAD (SERVICIOS) ' },
  ];

  tipoDoc: tDoc[] = [
    { value: '6', viewValue: 'RUC' },
    { value: '1', viewValue: 'DNI' },
  ];
  tipoTras: tDoc[] = [
    { value: '01', viewValue: 'VENTA' },
    { value: '14', viewValue: 'VENTA SUJETA A CONFIRMACION DEL COMPRADOR' },
    { value: '02', viewValue: 'COMPRA' },
    {
      value: '04',
      viewValue: 'TRASLADO ENTRE ESTABLECIMIENTOS DE LA MISMA EMPRESA',
    },
    { value: '18', viewValue: 'TRASLADO EMISOR ITINERANTE CP' },
    { value: '08', viewValue: 'IMPORTACION' },
    { value: '09', viewValue: 'EXPORTACION' },
    { value: '19', viewValue: 'TRASLADO A ZONA PRIMARIA' },
    { value: '13', viewValue: 'OTROS' },
  ];
  codigoTras: tDoc[] = [
    { value: '01', viewValue: 'TRANSPORTE PUBLICO' },
    { value: '02', viewValue: 'TRANSPORTE PRIVADO' },
  ];

  giaremision: GuiaRemision;
  departamentos: [];
  provincias: [];
  distritos = [];
  departamentosl: [];
  provinciasl: [];
  distritosl = [];
  series: Series[] = [];
  idGuia = 0;
  seriecomp ='';
  numero_guia = '';
  ruc = '';
  cliente = '';
  status = 1;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private rucService: RucService,
    private ventaService: VentaService,
    private sunatService: SunatService,
    private activatedRoute: ActivatedRoute
  ) {
    this.buiilForm();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.idGuia = params.id;
      this.seriecomp = params.serie;

      this.ventaService.getGuiaRemision(this.idGuia,this.seriecomp).subscribe((guia) => {
        this.form.patchValue(guia);
        this.ventaService.getSerieIdVenta(this.idGuia).subscribe((g) => {
          let ser = JSON.parse(JSON.stringify(g));
          for (let i = 0; i < ser.length; i++) {
            this.series.push({
              iddetventa: ser[i].iddetventa,
              idproducto: ser[i].idprodcuto,
              serie: ser[i].serie,
            });
          }
      
          console.log(this.series);
          this.giaremision = JSON.parse(JSON.stringify(guia));
          this.status = this.giaremision.status;
          this.numero_guia =
            this.giaremision.serie_comprobante +
            '-' +
            this.giaremision.numero_comprobante;
          this.ruc = this.giaremision.cliente_numerodocumento;
          this.cliente = this.giaremision.cliente_nombre;
          this.dataSource = JSON.parse(
            JSON.stringify(this.giaremision.detalle)
          );
          this.loading = false;
          this.form.controls['serie'].setValue( this.giaremision.serie_comprobante);
          // console.log(guia);
        });
      });
    });
    const usr = JSON.parse(localStorage.getItem('user'));

    this.ventaService.getDepartamentos().subscribe((dep) => {
      this.departamentos = JSON.parse(JSON.stringify(dep));
      this.departamentosl = JSON.parse(JSON.stringify(dep));
    });

    this.form.controls['tipo_documento_transporte'].setValue('6');
    this.form.controls['sede'].setValue('' + usr.sede);
    this.form.controls['idusuario'].setValue('' + usr.id);
  }
  motivo_traslado(val, e) {
    if (e.isUserInput) {
      this.form.controls['motivo_traslado'].setValue(val);
    }
  }
  cargarProvincias(id, e) {
    if (e.isUserInput) {
      this.ventaService.getProvincias(id).subscribe((prov) => {
        this.provincias = JSON.parse(JSON.stringify(prov));
      });
    }
  }
  cargarDistritos(id, e) {
    if (e.isUserInput) {
      this.ventaService.getDistritos(id).subscribe((prov) => {
        this.distritos = JSON.parse(JSON.stringify(prov));
      });
    }
  }
  cargarProvinciasl(id, e) {
    if (e.isUserInput) {
      this.ventaService.getProvincias(id).subscribe((prov) => {
        this.provinciasl = JSON.parse(JSON.stringify(prov));
      });
    }
  }
  cargarDistritosl(id, e) {
    if (e.isUserInput) {
      this.ventaService.getDistritos(id).subscribe((prov) => {
        this.distritosl = JSON.parse(JSON.stringify(prov));
      });
    }
  }

  buscarRuc(e) {
    const doc = this.form.controls['nro_documento_transporte'].value;
    const tdoc = this.form.controls['tipo_documento_transporte'].value;
    if (doc.length === 8 && tdoc === '1') {
      this.rucService.getDni(doc).subscribe(
        (res) => {
          const data = JSON.parse(JSON.stringify(res));

          if (data.success) {
            this.form.controls['razon_social_transporte'].setValue(data.nombre);

          }
        },
        (err) => {
          this.form.controls['razon_social_transporte'].setValue('');

          this.openSnackBar('No existe !!', 'Cerrar');
        }
      );
    } else if (doc.length === 11 && this.tipodocumento === '6') {
      this.rucService.getRuc(doc).subscribe(
        (res) => {
          const data = JSON.parse(JSON.stringify(res));

          if (data.success && data.estado_del_contribuyente === 'ACTIVO') {
            this.form.controls['razon_social_transporte'].setValue(
              data.nombre_o_razon_social
            );

            //console.log(data);
          } else {
            this.openSnackBar('' + data.estado_del_contribuyente, 'Cerrar');
          }
        },
        (err) => {
          this.form.controls['razon_social_transporte'].setValue('');

          this.openSnackBar('No existe !!', 'Cerrar');
        }
      );
    } else {
      this.openSnackBar('No Documento no valido !!', 'Cerrar');
    }
  }

  saveUser(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const user = this.form.value;
    }
  }

  private buiilForm() {
    this.form = this.formBuilder.group({
      codmotivo_traslado: ['', [Validators.required]],
      motivo_traslado: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      numero_paquetes: ['', [Validators.required]],
      codtipo_transportista: ['', [Validators.required]],
      tipo_documento_transporte: ['', [Validators.required]],
      nro_documento_transporte: ['', [Validators.required]],
      razon_social_transporte: ['', [Validators.required]],
      ubigeo_destino: ['', [Validators.required]],
      dir_destino: ['', [Validators.required]],
      ubigeo_partida: ['', [Validators.required]],
      dir_partida: ['', [Validators.required]],
      sede: ['', [Validators.required]],
      idusuario: ['', [Validators.required]],
      cliente_numerodocumento: ['', [Validators.required]],
      cliente_nombre: ['', [Validators.required]],
      cliente_tipodocumento: ['', [Validators.required]],
      serie_comprobante: ['', [Validators.required]],
      numero_comprobante: ['', [Validators.required]],
      fecha_comprobante: ['', [Validators.required]],
      cod_tipo_documento: ['09'],
      nota: ['esta es una nota'],
      serie:['', [Validators.required]],
    });
  }
  generarGuia() {
    const usr = JSON.parse(localStorage.getItem('user'));
    if (this.series.length > 0) {
      this.ventaService.addSerie(this.series).subscribe((r) => {
        console.log(r);
      });
    }
    let gr = this.form.value;
    let guia = JSON.parse(
      JSON.stringify({
        ...this.form.value,
        detalle: this.dataSource,
        emisor: usr.edmisor,
      })
    );
    if (this.form.valid) {
      this.ventaService
        .updateGuiaRemision(this.giaremision.id, gr)
        .subscribe((re) => {
          
            this.openSnackBar('Datos actualizados!!', 'Cerrar');
            
          
        });
    } else {
      this.ventaService
        .updateGuiaRemision(this.giaremision.id, gr)
        .subscribe((re) => {
          this.openSnackBar('Guia registrada !!', 'Cerrar');
         
        });
    }
  }
  deleteProducto(index: number) {
    this.dataSource.splice(index, 1);
  }

  strNumber(n) {
    return parseFloat(n);
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
        (exits === false && cn < cant && value !== ' ')
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

  visible = true;
  selectable = true;
  removable = true;
}
