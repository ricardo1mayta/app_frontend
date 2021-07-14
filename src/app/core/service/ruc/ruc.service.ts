import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RucService {
  constructor(private http: HttpClient) {}
  getRuc(rucb) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.id;
    return this.http.post(environment.url_apiRuc + '/api/v1/ruc', {
      token: 'z7rpSSPwy9wptsweae9iBzeT4qMheLTFUQBKEYR49YAnohlSYfHZ2ELbi6Nc',
      ruc: rucb,
    });
  }
  getDni(dnib) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.id;
    return this.http.post(environment.url_apiRuc + '/api/v1/dni', {
      token: 'z7rpSSPwy9wptsweae9iBzeT4qMheLTFUQBKEYR49YAnohlSYfHZ2ELbi6Nc',
      dni: dnib,
    });
  }
}
