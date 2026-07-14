// gestion-pedidos.component.ts: Componente de lista de todos los pedidos con actualizacion de estado
// gestion-pedidos.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-gestion-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-pedidos.component.html',
  styleUrls: ['./gestion-pedidos.component.scss']
})
export class GestionPedidosComponent implements OnInit {

  pedidos: any[] = [];

  estadoSeleccionado = '';

  cargando = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  obtenerPedidos() {

    this.cargando = true;

    this.adminService.obtenerTodosLosPedidos(this.estadoSeleccionado)
      .subscribe({

        next: (resp: any) => {

          this.pedidos = resp.pedidos || [];
          this.cargando = false;

        },

        error: (err: any) => {

          console.error(err);
          this.cargando = false;

        }

      });

  }

  filtrarEstado() {
    this.obtenerPedidos();
  }

  cambiarEstado(id: number, estado: string) {

    const confirmar = confirm(
      `¿Desea cambiar el estado del pedido a "${estado}"?`
    );

    if (!confirmar) return;

    this.adminService
      .cambiarEstadoPedido(id, estado)
      .subscribe({

        next: () => {

          this.obtenerPedidos();

        },

        error: (err: any) => {

          console.error(err);

        }

      });

  }

}