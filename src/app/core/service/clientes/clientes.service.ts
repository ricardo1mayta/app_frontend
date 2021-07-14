import { Injectable } from '@angular/core';
import { Cliente } from './../../models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private http: HttpClient) {}

  getClientesSede() {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get<Cliente>(
      environment.url_api2 + '/secureApi/clientessede/' + id
    );
  }
}
