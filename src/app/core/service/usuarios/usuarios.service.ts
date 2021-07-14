import { Injectable } from '@angular/core';
import { User } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  usuarios: User[] = [];
  constructor(private http: HttpClient) {}

  getAllUser(page, item) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;
    return this.http.get<User>(
      environment.url_api2 + '/secureApi/users/' + id + '/' + page + '/' + item
    );
  }

  getAllMenu() {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.rol;

    return this.http.get<User>(environment.url_api2 + '/secureApi/menu/' + id);
  }
  getSubSedes() {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.sede;

    return this.http.get<User>(
      environment.url_api2 + '/secureApi/subsedes/' + id
    );
  }
  getUser(id: string) {
    return this.http.get<User>(environment.url_api2 + '/secureApi/user/' + id);
  }
  updateUser(id: string, changes: Partial<User>) {
    return this.http.put(
      environment.url_api2 + `/secureApi/user/${id}`,
      changes
    );
  }
  deleteUser(id: string) {
    return this.http.delete(environment.url_api2 + `secureApi/user/${id}`);
  }

  getUserParent() {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.id;
    return this.http.get<User>(
      environment.url_api2 + '/secureApi/userparent/' + id
    );
  }
  getUserParent2(page, item) {
    const us = JSON.parse(localStorage.getItem('user'));
    const id = us.id;
    return this.http.get<User>(
      environment.url_api2 +
        '/secureApi/userparent2/' +
        id +
        '/' +
        page +
        '/' +
        item
    );
  }
}
