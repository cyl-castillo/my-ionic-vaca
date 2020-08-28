import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(lista: any[], text: string, field: string): any[] {
    if ( text == ''){
        return lista;
    }
    text = text.toLowerCase();
    return lista.filter( item =>{
      return item[field].toLowerCase().includes(text)
    })
  }

}
