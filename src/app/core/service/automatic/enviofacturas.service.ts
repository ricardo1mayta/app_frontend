import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnviofacturasService {
  constructor(private http: HttpClient) {}
  getventas() {
    return this.http.get(environment.url_api2 + `/api/ventas/`);
  }
  getDetalleVentaId(id) {
    return this.http.get(environment.url_api2 + `/api/detalleventa/` + id);
  }

  getSedes(id) {
    return this.http.get(environment.url_api2 + `/api/sede/` + id);
  }

  respuestaSunat(respuesta) {
    return this.http.post(
      environment.url_api2 + `/api/respuestaSunat/`,
      JSON.parse(JSON.stringify(respuesta))
    );
  }
}
