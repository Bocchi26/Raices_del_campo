import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productos = [
    { id: 1, nombre: 'Papa Pastusa', precio: 5000, categoria: 'verduras' },
    { id: 2, nombre: 'Tomate Chonto', precio: 3500, categoria: 'verduras' },
    { id: 3, nombre: 'Queso Campesino', precio: 12000, categoria: 'lacteos' }
  ];

  getProducts(categoria: string): Observable<any[]> {
    if (!categoria) {
      return of(this.productos);
    }

    const filtrados = this.productos.filter(producto => producto.categoria === categoria);
    return of(filtrados);
  }

  getProductById(id: number): Observable<any> {
    const producto = this.productos.find(item => item.id === id);
    return of(producto || null);
  }
}
