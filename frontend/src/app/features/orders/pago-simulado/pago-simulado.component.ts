// pago-simulado.component.ts: Componente de simulacion de pago con boton de confirmacion
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { OrdersService, Pedido } from '../orders.service';

interface MetodoPago {
  valor: string;
  etiqueta: string;
  icono: string;
}

@Component({
  selector: 'app-pago-simulado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago-simulado.component.html',
  styleUrls: ['./pago-simulado.component.css']
})
export class PagoSimuladoComponent implements OnInit {

  idPedido!: number;
  pedido: Pedido | null = null;

  cargandoPedido = true;
  enviandoPago = false;
  error: string | null = null;

  metodoSeleccionado: string | null = null;

  pagoConfirmado = false;
  referenciaPago: string | null = null;
  estadoActualizado: string | null = null;

  metodosPago: MetodoPago[] = [
    { valor: 'PSE', etiqueta: 'PSE', icono: '🏦' },
    { valor: 'tarjeta', etiqueta: 'Tarjeta de crédito/débito', icono: '💳' },
    { valor: 'nequi', etiqueta: 'Nequi', icono: '📱' },
    { valor: 'daviplata', etiqueta: 'Daviplata', icono: '📲' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      this.error = 'No se especificó un pedido válido.';
      this.cargandoPedido = false;
      return;
    }

    this.idPedido = Number(idParam);
    this.cargarPedido();
  }

  cargarPedido(): void {
    this.ordersService.obtenerPedidoPorId(this.idPedido).subscribe({
      next: (pedido: Pedido) => {
        this.pedido = pedido;
        this.cargandoPedido = false;
      },
      error: (err: any) => {
        console.error('Error al cargar el pedido:', err);
        this.error = 'No se pudo cargar el pedido. Intenta nuevamente.';
        this.cargandoPedido = false;
      }
    });
  }

  seleccionarMetodo(metodo: string): void {
    this.metodoSeleccionado = metodo;
  }

  confirmarPago(): void {
    this.error = null;

    if (!this.metodoSeleccionado) {
      this.error = 'Selecciona un método de pago.';
      return;
    }

    this.enviandoPago = true;

    this.ordersService.confirmarPago(this.idPedido, this.metodoSeleccionado).subscribe({
      next: (respuesta) => {
        this.referenciaPago = respuesta.referencia_pago;
        this.estadoActualizado = respuesta.estado;
        this.pagoConfirmado = true;
        this.enviandoPago = false;
      },
      error: (err: any) => {
        console.error('Error al confirmar el pago:', err);
        this.error = err.error?.error || 'No se pudo confirmar el pago. Intenta nuevamente.';
        this.enviandoPago = false;
      }
    });
  }

  irAMisPedidos(): void {
    this.router.navigate(['/pedidos/mis-pedidos']);
  }
}