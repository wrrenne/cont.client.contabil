import { Pipe, PipeTransform } from '@angular/core';
import { StringsService } from '../services/strings.service';

@Pipe({
    name: 'formatBytes',
    standalone: true
})
export class FormatBytesPipe implements PipeTransform {

    transform(value: number | undefined, decimals: number = 2): string {
        if (value)
            return this.stringsService.formatBytes(value, decimals)
        else
            return ""
    }

    constructor(private stringsService: StringsService) { }
}
