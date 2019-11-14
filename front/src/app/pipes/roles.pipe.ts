import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roles'
})
export class RolesPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    switch (value) {
      case '1':
        return "Asesor"
        break;
      case '2':
        return "Mecánico";
        break;
      case '3':
        return "Aseador";
        break;

      default:
        return "Roleless";
        break;
    }
  }

}
