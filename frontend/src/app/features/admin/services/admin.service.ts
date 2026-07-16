import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) {}

  obtenerTodosLosProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  crearProducto(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, data);
  }

  editarProducto(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${id}`, data);
  }

  desactivarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  obtenerTodosLosPedidos(estado?: string): Observable<any> {

    let params = new HttpParams();

    if (estado) {
      params = params.set('estado', estado);
    }

    return this.http.get(`${this.apiUrl}/orders`, { params });
  }

  cambiarEstadoPedido(id: number, estado: string): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/orders/${id}/status`,
      { estado }
    );
  }

  obtenerReporteVentas(
    fechaInicio: string,
    fechaFin: string
  ): Observable<any> {

    const params = new HttpParams()
      .set('fecha_inicio', fechaInicio)
      .set('fecha_fin', fechaFin);

    return this.http.get(
      `${this.apiUrl}/reports/sales`,
      { params }
    );
  }
  obtenerCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
}
}