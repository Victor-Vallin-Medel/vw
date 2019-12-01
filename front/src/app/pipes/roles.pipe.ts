import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roles'
})
export class RolesPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    switch (value) {
      case 1:
        return "Administrador"
        break;
      case 3:
        return "Mecánico";
        break;
      case 4:
        return "Aseador";
        break;

      default:
        return "Roleless";
        break;
    }
  }

}
