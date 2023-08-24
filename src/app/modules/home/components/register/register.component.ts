import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const form = this.form.value;
    if (!this.form.valid || form.password !== form.confirmPassword) {
      return;
    }
    const user: User = {
      name: form.name!,
      email: form.email!,
      password: form.password!
    }
    this.authService.signUp(user).subscribe((res: any) => {
      if (res.result) {
        this.form.reset();
        this.router.navigate(['login']);
      }
    });
  }
}
