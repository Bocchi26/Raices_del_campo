// gestion-productos.component.ts: Componente ABM de productos del catalogo (crear, editar, eliminar)
// gestion-productos.component.ts

// gestion-productos.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-gestion-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.scss']
})
export class GestionProductosComponent implements OnInit {

  productos: any[] = [];
  categorias: any[] = [];

  mostrarFormulario = false;
  editando = false;

  producto = this.crearProductoVacio();

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarProductos(): void {

    this.adminService.obtenerTodosLosProductos()
      .subscribe({

        next: (response: any) => {

          this.productos = response.productos || [];

        },

        error: (error: any) => {

          console.error('Error cargando productos', error);

        }

      });

  }

  cargarCategorias(): void {

    this.adminService.obtenerCategorias()
      .subscribe({

        next: (response: any) => {

          this.categorias = response.categorias || [];

        },

        error: (error: any) => {

          console.error('Error cargando categorías', error);

        }

      });

  }

  crearNuevoProducto(): void {

    this.editando = false;

    this.producto = this.crearProductoVacio();

    this.mostrarFormulario = true;

  }

  editarProducto(producto: any): void {

    this.editando = true;

    this.producto = { ...producto };

    this.mostrarFormulario = true;

  }

  guardarProducto(): void {

    if (
      !this.producto.nombre ||
      !this.producto.id_categoria ||
      !this.producto.precio_venta
    ) {

      alert('Complete los campos obligatorios.');

      return;

    }

    if (this.editando) {

      this.adminService
        .editarProducto(
          (this.producto as any).id_producto,
          this.producto
        )
        .subscribe({

          next: () => {

            alert('Producto actualizado correctamente.');

            this.cerrarFormulario();

            this.cargarProductos();

          },

          error: (error: any) => {

            console.error(error);

          }

        });

    } else {

      this.adminService
        .crearProducto(this.producto)
        .subscribe({

          next: () => {

            alert('Producto creado correctamente.');

            this.cerrarFormulario();

            this.cargarProductos();

          },

          error: (error: any) => {

            console.error(error);

          }

        });

    }

  }

  cambiarEstado(producto: any): void {

    const mensaje = producto.activo
      ? '¿Desea desactivar este producto?'
      : '¿Desea activar este producto?';

    if (!confirm(mensaje)) {

      return;

    }

    this.adminService
      .desactivarProducto(producto.id_producto)
      .subscribe({

        next: () => {

          this.cargarProductos();

        },

        error: (error: any) => {

          console.error(error);

        }

      });

  }

  cerrarFormulario(): void {

    this.mostrarFormulario = false;

    this.editando = false;

    this.producto = this.crearProductoVacio();

  }

  private crearProductoVacio() {

    return {

      id_producto: null,

      id_categoria: '',

      nombre: '',

      descripcion: '',

      unidad_medida: '',

      origen: '',

      precio_compra_kg: 0,

      precio_venta: 0,

      stock_disponible: 0,

      imagen_url: '',

      activo: true

    };

  }

}