// carrito.service.ts: Servicio Angular que mantiene el estado del carrito en memoria (sin BD)
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ItemCarrito {
  id_producto: number;
  nombre: string;
  precio_venta: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: ItemCarrito[] = [];

  private carritoSubject = new BehaviorSubject<ItemCarrito[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  private contadorItems = new BehaviorSubject<number>(0);
  contadorItems$ = this.contadorItems.asObservable();

  constructor() {}

  // Método que espera checkout.component.ts
  obtenerItemsCarrito(): Observable<ItemCarrito[]> {
    return this.carrito$;
  }

  agregarProducto(producto: Omit<ItemCarrito, 'cantidad'>, cantidad: number): void {
    const existe = this.carrito.find(
      item => item.id_producto === producto.id_producto
    );

    if (existe) {
      existe.cantidad += cantidad;
    } else {
      this.carrito.push({
        ...producto,
        cantidad
      });
    }

    this.actualizarEstado();
  }

  quitarProducto(id_producto: number): void {
    this.carrito = this.carrito.filter(
      item => item.id_producto !== id_producto
    );

    this.actualizarEstado();
  }

  actualizarCantidad(id_producto: number, cantidad: number): void {
    const producto = this.carrito.find(
      item => item.id_producto === id_producto
    );

    if (producto) {
      producto.cantidad = cantidad;
    }

    this.actualizarEstado();
  }

  calcularTotal(): number {
    return this.carrito.reduce(
      (total, item) => total + (item.precio_venta * item.cantidad),
      0
    );
  }

  obtenerCarrito(): ItemCarrito[] {
    return this.carrito;
  }

  vaciarCarrito(): void {
    this.carrito = [];
    this.actualizarEstado();
  }

  private actualizarEstado(): void {
    this.carritoSubject.next(this.carrito);

    const totalItems = this.carrito.reduce(
      (total, item) => total + item.cantidad,
      0
    );

    this.contadorItems.next(totalItems);
  }
}