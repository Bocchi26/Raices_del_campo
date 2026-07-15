// carrito.service.ts: Servicio Angular que mantiene el estado del carrito en memoria (sin BD)
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class CarritoService {

private carrito: any[] = [];

private carritoSubject = new BehaviorSubject<any[]>([]);

carrito$ = this.carritoSubject.asObservable();

private contadorItems = new BehaviorSubject<number>(0);

contadorItems$ = this.contadorItems.asObservable();

constructor() {}

agregarProducto(producto: any, cantidad: number): void {

    const existe = this.carrito.find(
    item => item.id === producto.id
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
    item => item.id !== id_producto
    );

    this.actualizarEstado();

}

actualizarCantidad(id_producto: number, cantidad: number): void {

    const producto = this.carrito.find(
    item => item.id === id_producto
    );

    if (producto) {

    producto.cantidad = cantidad;

    }

    this.actualizarEstado();

}

calcularTotal(): number {

    return this.carrito.reduce(

    (total, item) =>

        total + (item.precio * item.cantidad),

    0

    );

}

obtenerCarrito(): any[] {

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