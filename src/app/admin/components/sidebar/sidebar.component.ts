import { Component, OnInit } from '@angular/core';
import { appitemsAdmin } from './../../../shared/menu/admin';
import { appitemsVentas } from './../../../shared/menu/ventas';
import { Auth2Service } from './../../../core/service/auth2.service';
import { UsuariosService } from './../../../core/service/usuarios/usuarios.service';
import { Router } from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private authService: Auth2Service,
    private router: Router,
    private usuariosService: UsuariosService
  ) {}
  appitems;
  config;
  user;
  ngOnInit() {
    this.appitems = [];
    const usr = JSON.parse(localStorage.getItem('user'));
    this.user = JSON.parse(JSON.stringify(usr));
    this.config = config;
    this.usuariosService.getAllMenu().subscribe((res) => {
      this.appitems = JSON.parse(JSON.stringify(res));
    });

    this.config = config;
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
  logout() {
    if (this.authService.logout()) {
      this.router.navigate(['home']);
    }
  }
}
const config = {
  paddingAtStart: true,
  classname: 'mimenu',
  fontColor: 'rgb(194,194,194)',

  selectedListFontColor: 'black',
  highlightOnSelect: true,
  collapseOnSelect: true,
};
