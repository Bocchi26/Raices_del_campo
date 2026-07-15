import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categorias = [
    { id: 1, nombre: 'verduras' },
    { id: 2, nombre: 'lacteos' },
    { id: 3, nombre: 'frutas' }
  ];

  getCategories(): Observable<any[]> {
    return of(this.categorias);
  }
}
