import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from './../../../utils/validators';
import { Auth2Service } from './../../../core/service/auth2.service';
import { Product } from './../../../core/models/product.model';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  image$: Observable<any>;
  constructor(
    private formBuilder: FormBuilder,
    private auth2Service: Auth2Service,
    private router: Router,
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
    const usr = JSON.parse(localStorage.getItem('user'));

    this.form.controls['parent'].setValue(usr.id);
    this.form.controls['sede'].setValue(usr.sede);
  }
  saveUser(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const user = this.form.value;
      this.auth2Service.register(user).subscribe((us) => {
        const { sms } = Object.values(us)[1][0][0];

        this.openSnackBar(sms, 'Cerrar');
        this.router.navigate(['./admin/user']);
      });
    }
  }

  private buiilForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      firtsName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      image: [''],
      telefono: ['', [Validators.required]],
      status: ['1'],
      rol: ['2'],
      parent: ['0'],
      sede: ['0'],
    });
  }
  get priceField() {
    return this.form.get('price');
  }
}
