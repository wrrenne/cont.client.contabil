import { Pipe, PipeTransform } from '@angular/core';
import { DateUtilsService } from '../services';

@Pipe({
    name: 'comment-time',
    standalone: true
})
export class CommentTimePipe implements PipeTransform {

    constructor(dateUtilsService: DateUtilsService) {

    }

    transform(date: Date | string): string {
        return ""
    //    date = new Date(date);  // if orginal type was a string
    //    date.setDate(date.getDate() - day);
    //    return new DatePipe('en-US').transform(date, format);
    }
}
