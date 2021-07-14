import { Injectable } from '@angular/core';
import { Factura } from './../../models/factura.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SunatService {
  factura = [];
  constructor(private http: HttpClient) {}
  envioFactura(factura) {
    console.log(JSON.stringify(factura));
    return this.http.post(
      environment.url_apiSunat + `/factelect/api_facturacion/factura.php`,
      JSON.parse(JSON.stringify(factura))
    );
  }
  envioBoleta(factura) {
    return this.http.post(
      environment.url_apiSunat + `/factelect/api_facturacion/boleta.php`,
      JSON.parse(JSON.stringify(factura))
    );
  }
  envioGuia(factura) {
    return this.http.post(
      environment.url_apiSunat + `/factelect/api_facturacion/guia_remision.php`,
      JSON.parse(JSON.stringify(factura))
    );
  }
  envioNotaCredito(factura) {
    return this.http.post(
      environment.url_apiSunat + `/factelect/api_facturacion/notacredito.php`,
      JSON.parse(JSON.stringify(factura))
    );
  }
}
