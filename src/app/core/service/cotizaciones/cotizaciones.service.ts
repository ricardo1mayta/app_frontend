import { Injectable } from '@angular/core';
import { Factura } from './../../models/factura.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CotizacionesService {
  factura: Factura[] = [];
  constructor(private http: HttpClient) {}
  createCotizacion(factura: Factura) {
    return this.http.post(
      environment.url_api2 + `/secureApi/cotizacion/`,
      factura
    );
  }
  getCotizacionesSede(page, pagesize) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get(
      environment.url_api2 +
        `/secureApi/cotizaciones/` +
        id +
        '/' +
        page +
        '/' +
        pagesize
    );
  }
  getPedidoId(id) {
    return this.http.get(environment.url_api2 + `/secureApi/cotizacion/` + id);
  }

  getDetallePedidoId(id) {
    return this.http.get(
      environment.url_api2 + `/secureApi/detallecotizaciones/` + id
    );
  }
  deletePedidoId(id) {
    return this.http.delete(
      environment.url_api2 + `/secureApi/contizacion/` + id
    );
  }
}
