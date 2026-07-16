export interface Usuario {
  id_cliente: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: 'comprador' | 'administrador';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono: string;
  direccion: string;
  ciudad: string;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}