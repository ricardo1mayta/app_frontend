import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CreditoscomprasService {
  constructor(private http: HttpClient) {}
  getCreditosCompras() {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get(
      environment.url_api2 + `/secureApi/creditoscompras/` + id
    );
  }
  getCreditosComprasSede(doc) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get(
      environment.url_api2 + `/secureApi/creditoscomprassede/` + doc + '/' + id
    );
  }
  pagarTodo(doc) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.post(
      environment.url_api2 + `/secureApi/pagotodocredito/`,
      doc
    );
  }
  pagarfraccion(doc) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.post(
      environment.url_api2 + `/secureApi/pagofraccioncredito/`,
      doc
    );
  }
  getAbonos(id) {
    return this.http.get(
      environment.url_api2 + `/secureApi/pagoscomprasabonos/` + id
    );
  }
}
