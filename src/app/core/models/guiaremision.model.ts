export interface GuiaRemision {
  serie_comprobante: string;
  numero_comprobante: string;
  fecha_comprobante: string;
  cod_tipo_documento: string;
  nota: string;
  codmotivo_traslado: string;
  motivo_traslado: string;
  peso: string;
  numero_paquetes: string;
  codtipo_transportista: string;
  tipo_documento_transporte: string;
  nro_documento_transporte: string;
  razon_social_transporte: string;
  ubigeo_destino: string;
  dir_destino: string;
  ubigeo_partida: string;
  dir_partida: string;
  cliente_numerodocumento: string;
  cliente_nombre: string;
  cliente_tipodocumento: string;
  emisor: [];
  detalle: [];
  id: string;
  status: number;
}
