import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {


  registroForm: FormGroup;

  errorMensaje = '';

  exitoMensaje = '';



  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){


    this.registroForm = this.fb.group({

      nombre: [
        '',
        Validators.required
      ],


      apellido: [
        '',
        Validators.required
      ],


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
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      confirmarPassword: [
        '',
        [
            Validators.required,
            Validators.minLength(6)
        ]
        ],


      telefono: [
        '',
        Validators.required
      ],


      direccion: [
        '',
        Validators.required
      ],


      ciudad: [
        '',
        Validators.required
      ]

    });


  }



  registrar(): void {


    if(this.registroForm.invalid){

      return;

    }

    const datos = this.registroForm.value;


    if (datos.password !== datos.confirmarPassword) {

    this.errorMensaje = 'Las contraseñas no coinciden';

    return;

    }

    const {
    confirmarPassword,
    ...registro
    } = datos;

    this.authService.register(registro)
    .subscribe({

      next:(response)=>{


        


        this.exitoMensaje =
          'Usuario registrado correctamente';


        setTimeout(()=>{

          this.router.navigate([
            '/auth/login'
          ]);

        },1500);



      },


      error:(error)=>{


        

        this.errorMensaje =
          error.error?.mensaje ??
          'Error al registrar usuario';


      }


    });



  }


}