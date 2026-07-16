// checkout.component.ts: Componente de confirmacion de compra y direccion de envio
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CarritoService } from '../../catalog/carrito.service';
import { OrdersService } from '../orders.service';

interface ItemCarrito {
  id_producto: number;
  nombre: string;
  precio_venta: number;
  cantidad: number;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  items: ItemCarrito[] = [];
  cargandoCarrito = true;
  enviando = false;
  error: string | null = null;

  editandoDireccion = false;

  checkoutForm: FormGroup;
  fechaMinima: string;

  constructor(
    private fb: FormBuilder,
    private carritoService: CarritoService,
    private ordersService: OrdersService,
    private router: Router
  ) {
    // Fecha mínima seleccionable: mañana (bloquea hoy y fechas pasadas)
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    this.fechaMinima = manana.toISOString().split('T')[0];

    this.checkoutForm = this.fb.group({
      fecha_entrega: ['', Validators.required],
      franja_horaria: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.carritoService.obtenerItemsCarrito().subscribe({
      next: (itemsCarrito: ItemCarrito[]) => {
        if (!itemsCarrito || itemsCarrito.length === 0) {
          this.router.navigate(['/catalogo']);
          return;
        }

        this.items = itemsCarrito;
        this.cargandoCarrito = false;

        // TODO: cargar dirección real del perfil del usuario (ver nota abajo)
        // this.checkoutForm.patchValue({ direccion: perfilUsuario.direccion });
      },
      error: (err: any) => {
        console.error('Error al cargar el carrito:', err);
        this.error = 'No se pudo cargar el carrito. Intenta nuevamente.';
        this.cargandoCarrito = false;
      }
    });
  }

  get total(): number {
    return this.items.reduce(
      (acc, item) => acc + item.precio_venta * item.cantidad,
      0
    );
  }

  habilitarEdicionDireccion(): void {
    this.editandoDireccion = true;
  }

  guardarDireccion(): void {
    this.editandoDireccion = false;
  }

  confirmarPedido(): void {
    this.error = null;

    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      this.error = 'Completa todos los campos antes de continuar.';
      return;
    }

    this.enviando = true;

    const { fecha_entrega, franja_horaria } = this.checkoutForm.value;

    const itemsParaPedido = this.items.map((item) => ({
      id_producto: item.id_producto,
      cantidad: item.cantidad
    }));

    this.ordersService.crearPedido({
      items: itemsParaPedido,
      fecha_entrega,
      franja_horaria
    }).subscribe({
      next: (respuesta) => {
        this.router.navigate(['/pedidos/pago', respuesta.id_pedido]);
      },
      error: (err) => {
        console.error('Error al crear el pedido:', err);
        this.error = err.error?.error || 'No se pudo confirmar el pedido. Intenta nuevamente.';
        this.enviando = false;
      }
    });
  }
}