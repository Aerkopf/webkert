import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeTable',
  standalone: true
})
export class TimetablePipe implements PipeTransform {

  transform(value: string): string {
    return value ? value.slice(0, 5): '';
  }

}
