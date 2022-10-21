import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter',
  pure: true
})
export class TableFilterPipe implements PipeTransform {

  transform(list: any[], filters: Object) {
    const keys       = Object.keys(filters).filter(key => filters[key]);
    const filterReservation = reservation => keys.every(key => reservation[key] === filters[key]);

    return keys.length ? list.filter(filterReservation) : list;
  }

}