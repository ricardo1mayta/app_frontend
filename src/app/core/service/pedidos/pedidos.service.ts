import { Injectable } from '@angular/core';
import { Factura } from './../../models/factura.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  factura: Factura[] = [];
  constructor(private http: HttpClient) {}
  createVenta(factura: Factura) {
    return this.http.post(environment.url_api2 + `/secureApi/pedido/`, factura);
  }
  getPedidosSede(page, pagesize) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get(
      environment.url_api2 +
        `/secureApi/pedidos/` +
        id +
        '/' +
        page +
        '/' +
        pagesize
    );
  }
  getPedidosProductoSede(fini, ffin) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get(
      environment.url_api2 +
        `/secureApi/pedidosproductossede/` +
        id +
        '/' +
        fini +
        '/' +
        ffin
    );
  }
  getPedidoId(id) {
    return this.http.get(environment.url_api2 + `/secureApi/pedido/` + id);
  }

  getDetallePedidoId(id) {
    return this.http.get(
      environment.url_api2 + `/secureApi/detallePedido/` + id
    );
  }

  deletePedidoId(id) {
    return this.http.delete(environment.url_api2 + `/secureApi/pedido/` + id);
  }
}
