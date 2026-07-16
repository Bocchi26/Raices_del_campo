// auth.service.ts: Servicio Angular de autenticacion, manejo de sesion y token JWT
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  Usuario 
} from '../models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';

  private tokenKey = 'raices_token';

  private currentUserKey = 'raices_usuario';


  constructor(
    private http: HttpClient
  ) {}


  // Registrar usuario
  register(datos: RegisterRequest): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.apiUrl}/register`,
      datos
    );

  }


  // Iniciar sesión
  login(
    email: string,
    password: string
  ): Observable<AuthResponse> {

    const body: LoginRequest = {
      email,
      password
    };


    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      body
    );

  }


  // Cerrar sesión
  logout(): void {

    localStorage.removeItem(this.tokenKey);

    localStorage.removeItem(this.currentUserKey);

  }


  // Obtener JWT
  getToken(): string | null {

    return localStorage.getItem(this.tokenKey);

  }


  // Saber si existe sesión
  isLoggedIn(): boolean {

    return this.getToken() !== null;

  }


  // Obtener usuario autenticado
  getCurrentUser(): Usuario | null {

    const usuario = localStorage.getItem(
      this.currentUserKey
    );


    return usuario 
      ? JSON.parse(usuario)
      : null;

  }


  // Obtener rol del usuario
  getRol(): string | null {

    const usuario = this.getCurrentUser();

    return usuario
      ? usuario.rol
      : null;

  }


  // Guardar sesión después del login
  saveSession(response: AuthResponse): void {

    localStorage.setItem(
      this.tokenKey,
      response.token
    );


    localStorage.setItem(
      this.currentUserKey,
      JSON.stringify(response.usuario)
    );

  }

}