import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ItemPedido {
  id_producto: number;
  nombre: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

export interface Pedido {
  id_pedido: number;
  fecha_entrega: string;
  franja_horaria: string;
  total: number;
  estado: string;
  metodo_pago?: string;
  referencia_pago?: string;
  items: ItemPedido[];
}

export interface CrearPedidoPayload {
  items: { id_producto: number; cantidad: number }[];
  fecha_entrega: string;
  franja_horaria: string;
}

export interface CrearPedidoRespuesta {
  id_pedido: number;
}

export interface RespuestaPago {
  referencia_pago: string;
  estado: string;
}

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private apiUrl = '/api/orders';
  private paymentsUrl = '/api/payments';

  constructor(private http: HttpClient) {}

  // Crea un nuevo pedido (usado en checkout)
  crearPedido(payload: CrearPedidoPayload): Observable<CrearPedidoRespuesta> {
    return this.http.post<CrearPedidoRespuesta>(this.apiUrl, payload);
  }

  // Trae todos los pedidos del usuario autenticado
  obtenerMisPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/my`);
  }

  // Trae el detalle completo de un pedido por su id (usado en pago-simulado)
  obtenerPedidoPorId(id_pedido: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id_pedido}`);
  }

  // Cancela un pedido
  cancelarPedido(id_pedido: number): Observable<{ mensaje: string }> {
    return this.http.patch<{ mensaje: string }>(`${this.apiUrl}/${id_pedido}/cancel`, {});
  }

  // Confirma el pago simulado de un pedido (usado en pago-simulado)
  confirmarPago(id_pedido: number, metodo_pago: string): Observable<RespuestaPago> {
    return this.http.post<RespuestaPago>(`${this.paymentsUrl}/${id_pedido}`, { metodo_pago });
  }
}

