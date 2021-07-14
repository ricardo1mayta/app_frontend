import { Injectable } from '@angular/core';
import { Producto } from './../../models/producto.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  usuarios: Producto[] = [];
  constructor(private http: HttpClient) {}

  getAllProductos(page, item) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get<Producto>(
      environment.url_api2 +
        '/secureApi/productos/' +
        id +
        '/' +
        us.subsede +
        '/' +
        page +
        '/' +
        item
    );
  }
  getAllProductosMan(page, item) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get<Producto>(
      environment.url_api2 +
        '/secureApi/productosman/' +
        id +
        '/' +
        page +
        '/' +
        item
    );
  }
  getAllProductos2(page, item) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get<Producto>(
      environment.url_api2 +
        '/secureApi/productos2/' +
        id +
        '/' +
        us.subsede +
        '/' +
        page +
        '/' +
        item
    );
  }
  getAllProducts(page, item) {
    return this.http.get<Producto>(
      environment.url_api2 + '/api/productos/' + page + '/' + item
    );
  }

  getTraslados() {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get(environment.url_api2 + '/secureApi/traslados/' + id);
  }

  getProducto(id: string) {
    return this.http.get<Producto>(
      environment.url_api2 + '/secureApi/Producto/' + id
    );
  }

  deleteProducto(id: string) {
    return this.http.delete(environment.url_api2 + `/secureApi/producto/${id}`);
  }
  addProducto(producto) {
    return this.http.post(
      environment.url_api2 + '/secureApi/producto/',
      producto
    );
  }
  addTraslados(producto) {
    return this.http.post(
      environment.url_api2 + '/secureApi/traslados/',
      producto
    );
  }
  addProducto2(producto) {
    return this.http.post(
      environment.url_api2 + '/secureApi/producto2/',
      producto
    );
  }
  updateProducto2(id, producto) {
    return this.http.put(
      environment.url_api2 + '/secureApi/producto/' + id,
      producto
    );
  }
  getProductosSede() {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get<Producto>(
      environment.url_api2 + '/secureApi/productosede/' + id
    );
  }

  uploadFile(formData) {
    return this.http.post(environment.url_api2 + '/secureApi/upload', formData);
  }
}
