import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'daysRemaining',
    standalone: true
})
export class DaysRemainingPipe implements PipeTransform {
    transform(targetDate: Date): string {
        if (!(targetDate instanceof Date) || isNaN(targetDate.getTime())) {
            return 'invalid';
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const target = new Date(targetDate);
        target.setHours(0, 0, 0, 0);

        const diffTime = target.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays == 1)
            return `amanhã`;
        else
            if (diffDays > 0)
                return `em ${diffDays} dias`;
            else
                if (diffDays == -1)
                    return `ontem`;
                else
                    return `${-diffDays} dias atrás`;
    }
}
