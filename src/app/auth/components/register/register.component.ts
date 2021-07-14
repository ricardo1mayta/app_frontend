import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth2Service } from './../../../core/service/auth2.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  hasUnitNumber = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: Auth2Service
  ) {
    this.buildForm();
  }
  /*
  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService
        .createUser(value.email, value.password)
        .then(() => this.router.navigate(['auth/login']));
    }
  }
*/
  private buildForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {}
}
