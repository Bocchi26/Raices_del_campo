// detalle-pedido.component.ts: Componente de vista detallada de un pedido especifico
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { OrdersService, Pedido } from '../orders.service';

@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {

  idPedido!: number;
  pedido: Pedido | null = null;

  cargando = true;
  cancelando = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      this.error = 'No se especificó un pedido válido.';
      this.cargando = false;
      return;
    }

    this.idPedido = Number(idParam);
    this.cargarPedido();
  }

  cargarPedido(): void {
    this.cargando = true;

    this.ordersService.obtenerPedidoPorId(this.idPedido).subscribe({
      next: (pedido: Pedido) => {
        this.pedido = pedido;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al obtener el detalle del pedido:', err);
        this.error = 'No se pudo cargar el pedido. Intenta nuevamente.';
        this.cargando = false;
      }
    });
  }

  puedeCancelar(): boolean {
    return this.pedido?.estado === 'en_preparacion' || this.pedido?.estado === 'pendiente_pago';
  }

  cancelarPedido(): void {
    const confirmado = window.confirm(
      '¿Seguro que quieres cancelar este pedido? Esta acción no se puede deshacer.'
    );

    if (!confirmado) {
      return;
    }

    this.cancelando = true;
    this.error = null;

    this.ordersService.cancelarPedido(this.idPedido).subscribe({
      next: () => {
        this.cancelando = false;
        this.cargarPedido(); // recarga el pedido para reflejar el nuevo estado
      },
      error: (err: any) => {
        console.error('Error al cancelar el pedido:', err);
        this.error = err.error?.error || 'No se pudo cancelar el pedido. Intenta nuevamente.';
        this.cancelando = false;
      }
    });
  }

  volverAMisPedidos(): void {
    this.router.navigate(['/pedidos/mis-pedidos']);
  }
}