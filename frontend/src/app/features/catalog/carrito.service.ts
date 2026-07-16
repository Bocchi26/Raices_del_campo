// carrito.service.ts: Servicio Angular que mantiene el estado del carrito en memoria (sin BD)
// carrito.service.ts
// ⚠️ VERSIÓN TEMPORAL — implementada por Sebastian mientras [nombre del compañero]
// desarrolla la versión definitiva. Mismos métodos que necesita el checkout.
// TODO: Reemplazar cuando el servicio real esté listo (tarjeta de Trello: "...").

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ItemCarrito {
  id_producto: number;
  nombre: string;
  precio_venta: number;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private items: ItemCarrito[] = [
    // Datos de prueba para poder probar el checkout mientras no hay carrito real
    { id_producto: 1, nombre: 'Producto de prueba', precio_venta: 10000, cantidad: 2 }
  ];

  private itemsSubject = new BehaviorSubject<ItemCarrito[]>(this.items);

  obtenerItemsCarrito(): Observable<ItemCarrito[]> {
    return this.itemsSubject.asObservable();
  }
}