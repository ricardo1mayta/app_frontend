import { Injectable } from '@angular/core';
import { Factura } from './../../models/factura.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  factura: Factura[] = [];
  constructor(private http: HttpClient) {}
  createCompra(factura: Factura) {
    return this.http.post(environment.url_api2 + `/secureApi/compra/`, factura);
  }
  getPedidosSede(page, pagesize) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get(
      environment.url_api2 +
        `/secureApi/compras/` +
        id +
        '/' +
        page +
        '/' +
        pagesize
    );
  }
  getComprasProductoSede(fini, ffin) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get(
      environment.url_api2 +
        `/secureApi/comprasproductosede/` +
        id +
        '/' +
        fini +
        '/' +
        ffin
    );
  }

  getPedidoId(id) {
    return this.http.get(environment.url_api2 + `/secureApi/compra/` + id);
  }

  getDetallePedidoId(id) {
    return this.http.get(
      environment.url_api2 + `/secureApi/detallecompra/` + id
    );
  }
  deletePedidoId(id) {
    return this.http.delete(environment.url_api2 + `/secureApi/compra/` + id);
  }
}
