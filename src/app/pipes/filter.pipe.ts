import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for (const contacto of value) {
      if(
        contacto.apellido.toLowerCase().indexOf(arg.toLowerCase()) > -1 || 
        contacto.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 || 
        contacto.usuariocorreo.toLowerCase().indexOf(arg.toLowerCase()) > -1 
        ){
        resultPosts.push(contacto);
      };
    };
    return resultPosts;
  }

}
