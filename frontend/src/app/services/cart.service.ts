import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carrito: any[] = [];

  addToCart(producto: any, cantidad: number): void {
    const item = this.carrito.find(p => p.id === producto.id);
    if (item) {
      item.cantidad += cantidad;
    } else {
      this.carrito.push({ ...producto, cantidad });
    }
  }

  getCart(): any[] {
    return this.carrito;
  }

  clearCart(): void {
    this.carrito = [];
  }
}
