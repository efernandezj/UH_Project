import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paddingLeft'
})
export class PaddingLeftPipe implements PipeTransform {
  transform(value: number, qty: number): string {
    return value.toString().padStart(qty, '0');
  }
}

