import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(private formbuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.formbuilder.group({
      email: [''],
      password: [''],
    })
  }

  login() {
    if (!this.form.valid) return;
    this.authService.signIn(this.form.value);
    this.form.reset();
    this.router.navigate(['dashboard']);
  }
}
