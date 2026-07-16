// reportes.component.ts: Componente de reportes de ventas, inventario y rendimiento de campesinos

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {

  fechaInicio = '';
  fechaFin = '';

  reporte: any = null;

  constructor(private adminService: AdminService) {}

  consultarReporte() {
    if (!this.fechaInicio || !this.fechaFin) {
      alert('Seleccione un rango de fechas');
      return;
    }

    this.adminService
      .obtenerReporteVentas(this.fechaInicio, this.fechaFin)
      .subscribe({
        next: (resp: any) => {
          this.reporte = resp.reporte;
        },
        error: (err: any) => {
          console.error(err);
        }
      });
  }

  imprimir() {
    window.print();
  }

}