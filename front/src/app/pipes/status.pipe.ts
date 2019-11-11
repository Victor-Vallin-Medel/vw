import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    switch (value) {
      case 2:
        return "En espera de llegada."
        break;
      case 3:
        return "En recepción.";
        break;
      case 4:
        return "Reparando.";
        break;
      case 5:
        return "Lavando.";
        break;
      case 6:
        return "Finalizado";
        break;
    
      default:
        return "Stateless";
        break;
    }
  }

}
