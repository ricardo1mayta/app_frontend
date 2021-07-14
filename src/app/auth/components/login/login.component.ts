import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth2Service } from './../../../core/service/auth2.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  hasUnitNumber = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: Auth2Service
  ) {
    this.buildForm();
  }

  login(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.login(value.email, value.password).subscribe(
        (user) => {
          const us = Object.values(user);
          localStorage.setItem('user', JSON.stringify(us[1]));

          localStorage.setItem('token', us[2]);
          // console.log(us[2]);
          this.router.navigate(['admin']);
        },
        (err) => alert('Usuario no Valido')
      );
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {}
}
