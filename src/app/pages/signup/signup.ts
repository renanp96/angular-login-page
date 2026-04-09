import { Component } from '@angular/core';
import { DefaultLoginLayout } from '../../components/default-login-layout/default-login-layout';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInput } from '../../components/primary-input/primary-input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { ToastrService } from 'ngx-toastr';


interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  imports: [
    DefaultLoginLayout,
    ReactiveFormsModule,
    PrimaryInput,
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  signupForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  submit() {
    let email, password;

    email = this.signupForm.value.email;
    password = this.signupForm.value.password;

    this.loginService.login(email, password).subscribe({
      next: () => this.toastService.success('Login realizado com sucesso!'),
      error: () => this.toastService.error('Erro inesperado! Tente novamente mais tarde.')
    });
  }

  navigate() {
    this.router.navigate(["login"]);
  }

}
