// dashboard.component.ts: Componente del panel principal de administracion con KPIs y graficas
// dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalPedidosHoy = 0;
  ingresosHoy = 0;
  productosStockBajo = 0;
  pedidosPendientes = 0;

  cargando = false;

  constructor(
    private adminService: AdminService
  ) {}

  ngOnInit(): void {

    this.cargarDashboard();

  }

  cargarDashboard(): void {

    this.cargando = true;

    const hoy = new Date().toISOString().split('T')[0];

    this.adminService
      .obtenerReporteVentas(hoy, hoy)
      .subscribe({

        next: (response: any) => {

          if (response.reporte?.resumen) {

            this.totalPedidosHoy =
              response.reporte.resumen.total_pedidos ?? 0;

            this.ingresosHoy =
              response.reporte.resumen.ingresos_totales ?? 0;

          }

        },

        error: (error: any) => {

          console.error(error);

        }

      });

    this.adminService
      .obtenerTodosLosProductos()
      .subscribe({

        next: (response: any) => {

          const productos = response.productos || [];

          this.productosStockBajo =
            productos.filter(
              (producto: any) =>
                producto.stock_disponible < 5 &&
                producto.activo
            ).length;

        },

        error: (error: any) => {

          console.error(error);

        }

      });

    this.adminService
      .obtenerTodosLosPedidos()
      .subscribe({

        next: (response: any) => {

          const pedidos = response.pedidos || [];

          this.pedidosPendientes =
            pedidos.filter(
              (pedido: any) =>
                pedido.estado === 'en_preparacion'
            ).length;

          this.cargando = false;

        },

        error: (error: any) => {

          this.cargando = false;

          console.error(error);

        }

      });

  }

  formatearPesos(valor: number): string {

    return valor.toLocaleString('es-CO', {

      style: 'currency',

      currency: 'COP',

      minimumFractionDigits: 0

    });

  }

}