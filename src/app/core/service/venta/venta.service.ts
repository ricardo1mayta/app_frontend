import { Injectable } from '@angular/core';
import { Factura } from './../../models/factura.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class VentaService {
  factura: Factura[] = [];
  constructor(private http: HttpClient) {}
  createVenta(factura: Factura) {
    return this.http.post(environment.url_api2 + `/secureApi/venta/`, factura);
  }
  updateVenta(id, factura: Factura) {
    return this.http.put(
      environment.url_api2 + `/secureApi/venta/` + id,
      factura
    );
  }

  getDetalleVentaId(id) {
    return this.http.get(
      environment.url_api2 + `/secureApi/detalleventa/` + id
    );
  }

  getDetalleNotaCreditoId(id) {
    return this.http.get(
      environment.url_api2 + `/secureApi/detallenotacredito/` + id
    );
  }

  respuestaSunat(respuesta) {
    return this.http.post(
      environment.url_api2 + `/secureApi/respuestaSunat/`,
      JSON.parse(JSON.stringify(respuesta))
    );
  }

  getVentaSede(page, pagesize) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get(
      environment.url_api2 +
        `/secureApi/ventas/` +
        id +
        '/' +
        page +
        '/' +
        pagesize
    );
  }
  getVentaById(id) {
    return this.http.get(environment.url_api2 + `/secureApi/venta/` + id);
  }
  getNotaCreditoById(id) {
    const us = JSON.parse(localStorage.getItem('user'));

    return this.http.get(
      environment.url_api2 +
        `/secureApi/notacredito/` +
        us.sede +
        `/` +
        us.id +
        `/` +
        id
    );
  }

  getDepartamentos() {
    return this.http.get(environment.url_api2 + `/secureApi/departamentos/`);
  }
  getProvincias(id) {
    return this.http.get(environment.url_api2 + `/secureApi/provincias/` + id);
  }
  getDistritos(id) {
    return this.http.get(environment.url_api2 + `/secureApi/distritos/` + id);
  }

  getGuiaRemision(id,serie) {
    return this.http.get(
      environment.url_api2 + `/secureApi/guiaremision/`+serie+`/` + id
    );
  }
  updateGuiaRemision(id, guia) {
    return this.http.put(
      environment.url_api2 + `/secureApi/guiaremision/` + id,
      guia
    );
  }
  addSerie(series) {
    return this.http.post(environment.url_api2 + `/secureApi/series/`, series);
  }
  getSerieIdVenta(id) {
    return this.http.get(environment.url_api2 + `/secureApi/series/` + id);
  }

  getResumenVenta(id, ano,mes) {
    return this.http.get(
      environment.url_api2 + `/secureApi/resumenventas/` + id + '/' + ano +'/'+ mes
    );
  }
}
