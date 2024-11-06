import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthServices} from '../auth.services';
import {Router, RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {User} from "../user.model";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass, CommonModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  myForm!: FormGroup;
  protected readonly onsubmit = onsubmit;
  private authService = inject(AuthServices);

  constructor(private router: Router) {
  }

  onSubmit() {
    const name = this.myForm.value.name;
    const email = this.myForm.value.email;
    const password = this.myForm.value.password;
    const termos = this.myForm.value.termos;
    const sexo = this.myForm.value.sexo;
    const dataNascimento = this.myForm.value.dataNascimento;

    const user = new User(name, email, password, termos, sexo, dataNascimento)
    this.authService.register(user).subscribe({
      next: (response: any) => {
        if (response) {
          this.router.navigate(['/']);
        } else {
          console.log('error ao registrar');
        }
      },
      error: (error: any) => {
        console.log('error', error);
      }
    });
    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
      ]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
      termos: new FormControl(null, Validators.requiredTrue),
      sexo: new FormControl('Masculino'),
      dataNascimento: new FormControl(null),
    });
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }
}
