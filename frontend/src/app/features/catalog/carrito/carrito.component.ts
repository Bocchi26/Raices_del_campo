// carrito.component.ts: Componente del carrito de compras (items, cantidades, totales)
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
selector: 'app-carrito',
standalone: true,
imports: [CommonModule, RouterModule],
templateUrl: './carrito.component.html',
styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {

carrito = [
    {
    id: 1,
    nombre: 'Papa Pastusa',
    precio: 5000,
    cantidad: 2
    },
    {
    id: 2,
    nombre: 'Tomate Chonto',
    precio: 3500,
    cantidad: 1
    }
];

constructor(private router: Router) {}

obtenerTotal(): number {
    return this.carrito.reduce(
    (total, producto) =>
        total + producto.precio * producto.cantidad,
    0
    );
}

eliminarProducto(id: number) {
    this.carrito = this.carrito.filter(
    producto => producto.id !== id
    );
}

vaciarCarrito() {
    this.carrito = [];
}

checkout() {
    this.router.navigate(['/pedidos/checkout']);
}

}