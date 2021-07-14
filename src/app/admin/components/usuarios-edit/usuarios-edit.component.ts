import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MyValidators } from './../../../utils/validators';
import { UsuariosService } from './../../../core/service/usuarios/usuarios.service';
import { Product } from './../../../core/models/product.model';

import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.css'],
})
export class UsuariosEditComponent implements OnInit {
  form: FormGroup;
  id: string;

  image$: Observable<any>;
  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

    private _snackBar: MatSnackBar
  ) {
    this.buiilForm();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.usuariosService.getUser(this.id).subscribe((usr) => {
        this.form.patchValue(usr);
      });
    });
  }
  saveUser(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const user = this.form.value;
      this.usuariosService.updateUser(this.id, user).subscribe((us) => {
        //console.log();
        this.openSnackBar(us['sms'], 'Cerrar');
        this.router.navigate(['./admin/user']);
      });
    }
  }

  private buiilForm() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      email: ['', [Validators.required]],
      firtsName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      image: [''],
      telefono: ['', [Validators.required]],
    });
  }
  get priceField() {
    return this.form.get('price');
  }
}
