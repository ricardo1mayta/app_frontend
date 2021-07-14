export interface Factura {
  tipo_operacion: string;
  total_gravadas: string;
  total_inafecta: string;
  total_exoneradas: string;
  total_gratuitas: string;
  total_exportacion: string;
  total_descuento: string;
  sub_total: string;
  porcentaje_igv: string;
  total_igv: string;
  total_isc: string;
  total_otr_imp: string;
  total: string;
  total_letras: string;
  nro_guia_remision: string;
  cod_guia_remision: string;
  nro_otr_comprobante: string;
  serie_comprobante: string; //Para Facturas la serie debe comenzar por la letra F, seguido de tres dígitos
  numero_comprobante: string;
  fecha_comprobante: string;
  fecha_vto_comprobante: string;
  cod_tipo_documento: string;
  cod_moneda: string;

  //Datos del cliente
  cliente_numerodocumento: string;
  cliente_nombre: string;
  cliente_tipodocumento: string; //1: RUC
  cliente_direccion: string;
  cliente_pais: string;
  cliente_ciudad: string;
  cliente_codigoubigeo: string;
  cliente_departamento: string;
  cliente_provincia: string;
  cliente_distrito: string;
  tipo_proceso: string;
  detalle: [];
  emisor: {};
  cod_sunat: string;
  hash_cdr: string;
  mensaje: string;
  respuesta: string;
  ruta_cdr: string;
  ruta_pdf: string;
  ruta_xml: string;
}
