// detalle-producto.component.ts: Componente de ficha tecnica detallada del producto
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@services/product.service';
import { CartService } from '@services/cart.service';

@Component({
selector: 'app-detalle-producto',
templateUrl: './detalle-producto.component.html'
})
export class DetalleProductoComponent implements OnInit {
producto: any;
cantidad: number = 1;
mensaje: string = '';

constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
) {}

ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
    this.productService.getProductById(id).subscribe({
        next: (data) => this.producto = data,
        error: () => this.redirigirAlCatalogo()
    });
    }
}

agregarAlCarrito(): void {
    this.cartService.addToCart(this.producto, this.cantidad);
    this.mensaje = '¡Producto agregado correctamente!';
    setTimeout(() => this.mensaje = '', 3000); // Limpiar mensaje tras 3s
}

private redirigirAlCatalogo(): void {
    alert('Producto no disponible.');
    this.router.navigate(['/catalog']);
}
}