import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCop',
  standalone: true
})
export class CurrencyCopPipe implements PipeTransform {

  transform(value: number | string | null | undefined): string {

    if (value === null || value === undefined) {
      return '$0';
    }

    const numero = Number(value);

    if (isNaN(numero)) {
      return '$0';
    }

    return '$' + numero.toLocaleString('es-CO');

  }

}