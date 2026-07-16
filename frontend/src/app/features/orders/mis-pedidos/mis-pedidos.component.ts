// mis-pedidos.component.ts: Componente de historial de pedidos del comprador autenticado
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OrdersService, Pedido } from '../orders.service';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {

  pedidos: Pedido[] = [];
  cargando = true;
  error: string | null = null;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.ordersService.obtenerMisPedidos().subscribe({
      next: (pedidos: Pedido[]) => {
        this.pedidos = pedidos;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al obtener los pedidos:', err);
        this.error = 'No se pudieron cargar tus pedidos. Intenta nuevamente.';
        this.cargando = false;
      }
    });
  }

  // Devuelve la clase CSS según el estado, para el color visual
  claseEstado(estado: string): string {
    const mapa: Record<string, string> = {
      pendiente_pago: 'estado-amarillo',
      en_preparacion: 'estado-azul',
      en_camino: 'estado-naranja',
      entregado: 'estado-verde',
      cancelado: 'estado-rojo'
    };
    return mapa[estado] || 'estado-default';
  }

  // Devuelve una etiqueta legible para el estado
  etiquetaEstado(estado: string): string {
    const mapa: Record<string, string> = {
      pendiente_pago: 'Pendiente de pago',
      en_preparacion: 'En preparación',
      en_camino: 'En camino',
      entregado: 'Entregado',
      cancelado: 'Cancelado'
    };
    return mapa[estado] || estado;
  }
}