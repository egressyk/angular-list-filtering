import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'multiFilter'
})
export class MultiFilterPipe implements PipeTransform {
  transform(items: any[], filters: ((x: any) => boolean)[]): any[] {
    if(!items) return [];
    if(!filters || filters.length < 1) return items;

    const filterPipe = (filters) => (items) => filters.reduce((acc, filter) => {
      return filter ? acc.filter(filter): acc
    }, items);
    
    return filterPipe(filters)(items);
   }
}