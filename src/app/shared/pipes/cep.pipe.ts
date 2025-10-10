import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cep',
    standalone: true
})
export class FormatCepPipe implements PipeTransform {

    transform(value?: string): any {
        if (value != undefined)
            value = `${value.substring(0, 5)}-${value.substring(5, 3)}`
        return value
    }

}
