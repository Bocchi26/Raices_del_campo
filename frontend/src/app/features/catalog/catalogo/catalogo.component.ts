// catalogo.component.ts: Componente de listado del catalogo de productos con filtros
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { CategoryService } from '@services/category.service';
import { CartService } from '@services/cart.service';
import { CardProductoComponent } from '../../../shared/components/card-producto/card-producto.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, CardProductoComponent],
  templateUrl: './catalogo.component.html'
})
export class CatalogoComponent implements OnInit {
  productosOriginales: any[] = [];
  productosFiltrados: any[] = [];
  categorias: any[] = [];
  busqueda: string = '';
  categoriaSeleccionada: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.categoryService.getCategories().subscribe(cat => this.categorias = cat);
    this.filtrarPorCategoria();
  }

  filtrarPorCategoria(): void {
    this.productService.getProducts(this.categoriaSeleccionada).subscribe(data => {
      this.productosOriginales = data;
      this.aplicarFiltroBusqueda();
    });
  }

  aplicarFiltroBusqueda(): void {
    const term = this.busqueda.toLowerCase();
    this.productosFiltrados = this.productosOriginales.filter(p => 
      p.nombre.toLowerCase().includes(term)
    );
  }

  manejarAgregarAlCarrito(producto: any): void {
    this.cartService.addToCart(producto, 1);
    alert(`${producto.nombre} agregado al carrito`);
  }
}