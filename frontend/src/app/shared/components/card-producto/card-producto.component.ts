// card-producto.component.ts: Tarjeta de producto reutilizable para grillas del catalogo
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-producto',
  templateUrl: './card-producto.component.html',
  styleUrls: ['./card-producto.component.scss']
})
export class CardProductoComponent {
  @Input() producto: any; // O reemplazar por una interfaz IProducto
  @Output() agregar = new EventEmitter<any>();

  // URL por defecto si imagen_url es null o vacío
  placeholderImage = 'assets/images/placeholder.png';

  onAgregarClick(): void {
    this.agregar.emit(this.producto);
  }
}