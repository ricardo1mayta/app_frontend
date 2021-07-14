import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  constructor(private http: HttpClient) {}
  getPedidosSede(): Observable<any> {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get(
      environment.url_api2 + '/secureApi/pedidoreporte/' + id
    );
  }
  getPedidosUsarioSede() {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get(
      environment.url_api2 + '/secureApi/pedidousuariosreporte/' + id
    );
  }

  getPedidosDiaSede(): Observable<any> {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get(
      environment.url_api2 + '/secureApi/pedidodiareporte/' + id
    );
  }
  getPedidosUsarioDiaSede() {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get(
      environment.url_api2 + '/secureApi/pedidousuariosdiareporte/' + id
    );
  }
  getCierreDeCajasede(fecha) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get(
      environment.url_api2 + `/secureApi/cierredecaja/` + id + '/' + fecha
    );
  }
  ganaciasSede(fecha, fecha2) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get(
      environment.url_api2 +
        `/secureApi/ganancia/` +
        id +
        '/' +
        fecha +
        '/' +
        fecha2
    );
  }
}
