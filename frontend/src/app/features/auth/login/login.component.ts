import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  loginForm: FormGroup;

  errorMensaje = '';


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {


    this.loginForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required
        ]
      ]

    });


  }


  login(): void {


    if (this.loginForm.invalid) {

      return;

    }


    const {
      email,
      password
    } = this.loginForm.value;



    this.authService.login(
      email,
      password
    )
    .subscribe({

        next: (response) => {

            console.log("Respuesta login:", response);


            this.authService.saveSession(response);


            this.router.navigate([
                '/catalogo'
            ]);

        },


      error: (error) => {


        this.errorMensaje =
          error.error?.mensaje ??
          'Error al iniciar sesión';


      }


    });


  }


}