import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './../../../core/service/usuarios/usuarios.service';
import { User } from './../../../core/models/user.model';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  user: User;
  page = 0;
  pageSize = 10;
  length = 0;
  loading = false;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = [
    'id',
    'firtsName',
    'lastName',
    'email',
    'telefono',
    'img',
    'rol',
    'status',
    'actions',
  ];
  usr;
  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    const usr = JSON.parse(localStorage.getItem('user'));
    this.usr = usr;
    this.fetchUsers();
  }
  fetchUsers() {
    this.loading = true;
    this.usuariosService
      .getAllUser(this.page, this.pageSize)
      .subscribe((user) => {
        this.user = Object.values(user)[0];

        this.length = Object.values(user)[2];
        this.loading = false;
      });
  }
  deleteUser(id: string) {
    this.usuariosService.deleteUser(id).subscribe((rta) => {
      console.log(rta);

      this.fetchUsers();
    });
  }
  onChangePaginate(e: PageEvent) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
    this.fetchUsers();
  }
}
