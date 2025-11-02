import { Injectable } from '@angular/core';
import { StringsService } from './strings.service';

export enum TWeekDay {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}

@Injectable({
    providedIn: 'root',
})
export class DateUtilsService {
    dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    dayNamesFull = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    monthNamesFull = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    constructor(private stringsService: StringsService) {}

    firstDateOfCurrentMonth(): Date {
        return this.firstDateOfMonth(this.getToday());
    }

    firstDateOfCurrentYear(): Date {
        return this.firstDateOfYear(this.getToday());
    }

    firstDateOfMonth(d: Date): Date {
        return new Date(d.getUTCFullYear(), d.getUTCMonth(), 1, 0, 0, 0, 0);
    }

    firstDateOfYear(d: Date): Date {
        return new Date(d.getUTCFullYear(), 1, 1, 0, 0, 0, 0);
    }

    getToday(): Date {
        return this.getDatePart(new Date());
    }

    getYesterday(): Date {
        return this.addDays(this.getToday(), -1);
    }

    getDatePart(d: Date): Date {
        return this.toDateOnly(d);
        //return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0)
    }

    toDateOnly(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    getMonthName(d: Date): string {
        return this.monthNamesFull[d.getUTCMonth()];
    }

    getMonthNameAbbreviated(d: Date): string {
        return this.monthNames[d.getUTCMonth()];
    }

    getDay(d: Date): number {
        return d.getUTCDate();
    }

    getMonth(d: Date): number {
        return d.getUTCMonth() + 1;
    }

    getYear(d: Date): number {
        return d.getUTCFullYear();
    }

    firstDateOfCurrentMonthIso(): string {
        return this.GetDateIsoString(this.firstDateOfMonth(this.getToday()));
    }

    GetDateIsoString(d: Date): string {
        return d.toISOString().substring(0, 10);
    }

    GetIsoString(d: Date): string {
        return d.toISOString();
    }

    getWeekDateName(d: Date): string {
        return this.dayNamesFull[d.getUTCDay()];
    }

    getWeekDateNameAbbreviated(d: Date): string {
        return this.dayNames[d.getUTCDay()];
    }

    isToday(d: Date): boolean {
        return this.isSame(this.getToday(), d);
    }

    addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    addMonths(d: Date, n: number): Date {
        const date = new Date(d.getTime()); // clone to avoid mutating the original
        const day = date.getDate();

        date.setMonth(date.getMonth() + n);

        // Handle cases where adding months causes overflow (e.g., Jan 31 + 1 month = Mar 3)
        if (date.getDate() < day) {
            date.setDate(0); // go back to the last day of the previous month
        }

        return date;
        //return moment(d).add(n, 'months').toDate()
    }

    addWeeks(d: Date, n: number): Date {
        const result = new Date(d);
        result.setHours(0, 0, 0, 0); // Reset time to midnight
        result.setDate(d.getDate() + n * 7);
        return result;
    }

    isSame(date1: Date, date2: Date): boolean {
        return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
        //    return d1.getUTCDate() == d2.getUTCDate() && d1.getUTCMonth() == d2.getUTCMonth() && d1.getUTCFullYear() == d2.getUTCFullYear()
    }

    getMonthYear(d: Date): string {
        const month = d.getUTCMonth();
        const year = d.getUTCFullYear();

        return `${this.monthNamesFull[month]} de ${year}`;
    }

    getWeekDayName(d: Date): string {
        return this.dayNamesFull[d.getUTCDay()];
    }

    isSunday(d: Date): boolean {
        return d.getDay() == TWeekDay.Sunday;
    }

    lastDateOfMonth(d: Date): Date {
        return new Date(d.getFullYear(), d.getMonth() + 1, 0);
    }

    lastDateOfYear(d: Date): Date {
        return new Date(d.getFullYear(), 12, 0);
        //return moment(d).endOf('year').toDate()
    }

    getDiffDays(d1: Date, d2: Date): number {
        const start = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
        const end = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

        const diffTime = end.getTime() - start.getTime();
        return Math.round(diffTime / (1000 * 60 * 60 * 24));

        //return moment(d1).diff(moment(d2), 'days')
    }

    getWeekDay(d: Date): number {
        return d.getUTCDay();
    }

    isSameMonthYear(d1: Date, d2: Date): boolean {
        return d1.getUTCMonth() === d2.getUTCMonth() && d1.getUTCFullYear() === d2.getUTCFullYear();
    }

    firstDateOfWeek(d: Date): Date {
        const date = new Date(d);
        const day = date.getDay(); // Get current weekday (0 = Sunday, 6 = Saturday)

        date.setDate(date.getDate() - day); // Move back to Sunday
        date.setHours(0, 0, 0, 0); // Ensure time is 00:00:00.000

        return new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Return date only
    }

    lastDateOfWeek(d: Date): Date {
        const date = new Date(d);
        const day = date.getDay(); // Get current weekday (0 = Sunday, 6 = Saturday)
        const diff = 6 - day; // Days to add to reach Saturday

        date.setDate(date.getDate() + diff);
        date.setHours(0, 0, 0, 0); // Ensure time is 00:00:00.000

        return new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Return date only
    }

    lastDateOfCurrentMonth(): Date {
        return this.lastDateOfMonth(this.getToday());
    }

    getFormattedPeriod(d1: Date | null | undefined, d2: Date | null | undefined, nullMessage: string = '', abbreviated: boolean = false): string {
        if (d1 != null && d2 != null) {
            if (d1.getUTCMonth() == d2.getUTCMonth() && d1.getUTCFullYear() == d2.getUTCFullYear())
                return `${d1.getUTCDate()} a ${d2.getUTCDate()} de ${this.getMonthYear(d1)}`;
            else if (d1.getUTCFullYear() != d2.getUTCFullYear()) return `${this.getDateExtenso(d1)} a ${this.getDateExtenso(d2)}`;
            else {
                return `${this.getDayMonthExtenso(d1, ' ', abbreviated)} a ${this.getDayMonthExtenso(d2, ' ', abbreviated)} ${abbreviated ? '' : 'de'} ${d1.getUTCFullYear()}`;
            }
        } else {
            return nullMessage;
        }
    }

    getFormattedPeriodDayMonth(d1: Date | null | undefined, d2: Date | null | undefined, nullMessage: string = '', abbreviated: boolean = false): string {
        if (d1 != null && d2 != null) {
            if (d1.getUTCMonth() == d2.getUTCMonth() && d1.getUTCFullYear() == d2.getUTCFullYear())
                return `${d1.getUTCDate()} a ${d2.getUTCDate()} de ${abbreviated ? this.getMonthNameAbbreviated(d1) : this.getMonthName(d1)}`;
            else if (d1.getUTCFullYear() != d2.getUTCFullYear()) return `${this.getDateExtenso(d1, abbreviated)} a ${this.getDateExtenso(d2, abbreviated)}`;
            else {
                return `${this.getDayMonthExtenso(d1, ' ', abbreviated)} a ${this.getDayMonthExtenso(d2, ' ', abbreviated)}`;
            }
        } else {
            return nullMessage;
        }
    }

    getFormattedPeriodDays(d1: Date | null | undefined, d2: Date | null | undefined, nullMessage: string = ''): string {
        if (d1 != null && d2 != null) {
            return `${d1.getUTCDate()} a ${d2.getUTCDate()}`;
        } else {
            return nullMessage;
        }
    }

    getDateExtenso(d: Date, abbreviated = false): string {
        const day = d.getUTCDate();
        const month = abbreviated ? this.monthNames[d.getUTCMonth()] : this.monthNamesFull[d.getUTCMonth()];
        const year = d.getUTCFullYear();

        return `${day} de ${month} de ${year}`;
    }

    getDateDDMMYYYY(d: Date): string {
        const day = d.getUTCDate();
        const month = (d.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = d.getUTCFullYear();

        return `${day}/${month}/${year}`;
    }

    getDateDDMM(d: Date): string {
        const day = d.getUTCDate();
        const month = (d.getUTCMonth() + 1).toString().padStart(2, '0');

        return `${day}/${month}`;
    }

    getDayMonth(d: Date, separator = '/', showWeekDayName = false, showMonthName = false, showAbbreviatedMonthName = false) {
        const day = d.getUTCDate();
        const month = showMonthName
            ? showAbbreviatedMonthName
                ? this.monthNames[d.getUTCMonth()]
                : this.monthNamesFull[d.getUTCMonth()]
            : (d.getUTCMonth() + 1).toString();
        const week = showWeekDayName ? `, ${this.getWeekDateName(d).substring(0, 3)}` : '';

        return `${day}${separator}${month}${week}`;
    }

    getDayMonthExtenso(d: Date, separator = '/', abbreviated = false): string {
        const day = d.getUTCDate();
        var month = this.monthNamesFull[d.getUTCMonth()];

        if (abbreviated) {
            month = month.substring(0, 3);
        }

        return `${day}${separator}${month}`;
    }

    setDate(year: number, month: number, day: number): Date {
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    }

    getHourString(d: Date): string {
        return d.toLocaleTimeString().substring(0, 5);
    }

    //private getTime(hora: string): moment.Moment {
    //    let h = +hora.split(":")[0]
    //    let m = +hora.split(":")[1]
    //    return moment().set('hour', h).set('minute', m).set('second', 0).set('millisecond', 0)
    //}

    convertTimeToDate(t: string): Date | null {
        const [hours, minutes] = t.split(':').map(Number);

        const today = new Date();
        today.setHours(hours, minutes, 0, 0);

        return today;
        //return t ? this.getTime(t).toDate() : null
    }

    convertIsoStringToDate(s: string): Date {
        // Valida se a string está no formato esperado
        const isoFormat = /^\d{4}-\d{2}-\d{2}$/;
        if (!isoFormat.test(s)) {
            throw new Error("A string fornecida não está no formato ISO 'YYYY-MM-DD'.");
        }

        // Divide a string em partes de ano, mês e dia
        const [year, month, day] = s.split('-').map(Number);

        // Retorna um objeto Date (lembrando que o mês no objeto Date é 0-indexado)
        return new Date(year, month - 1, day);
        //return new Date(s)
    }

    convertToISODate(dateString: string): string {
        const parts = dateString.split('/');
        if (parts.length !== 3) {
            throw new Error('Invalid date format. Expected dd/MM/yyyy');
        }

        const [day, month, year] = parts.map(Number);
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }

    getGreeting(): string {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            return 'Bom Dia';
        } else if (currentHour >= 12 && currentHour < 18) {
            return 'Boa Tarde';
        } else {
            return 'Boa Noite';
        }
    }

    public abbreviatedWeekDayName(date: Date): string {
        const weekday = date.toLocaleDateString('pt-BR', { weekday: 'short' });
        return this.capitalize(weekday.replace('.', ''));
    }

    private capitalize(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    public formattedRelativeDate(date: Date, showTime = true, showWeekDayName = false): string {
        const inputDate = this.toDateOnly(date);
        const today = this.getToday();
        const yesterday = this.addDays(today, -1);

        const timePart = showTime ? ` às ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}` : '';
        const weekdayPart = showWeekDayName ? `${this.abbreviatedWeekDayName(inputDate)}, ` : '';

        if (this.isSame(inputDate, today)) {
            return `Hoje${timePart}`;
        }
        if (this.isSame(inputDate, yesterday)) {
            return `Ontem${timePart}`;
        }

        // Check if within the same year
        const sameYear = inputDate.getFullYear() === today.getFullYear();

        return sameYear
            ? `${weekdayPart}${inputDate.getDate()} de ${this.getMonthName(inputDate)}${timePart}`
            : `${weekdayPart}${inputDate.getDate()} de ${this.getMonthName(inputDate)} de ${inputDate.getFullYear()}${timePart}`;
    }

    public formattedRelativeMonth(date: Date): string {
        const today = this.getToday();

        const sameYear = date.getFullYear() === today.getFullYear();

        var result = this.getMonthName(date);

        if (!sameYear) result = `de ${date.getFullYear()}`;

        return result;
    }

    compareDates(d1: Date, d2: Date): boolean {
        return d1.getDate() == d2.getDate() && d1.getMonth() == d2.getMonth() && d1.getFullYear() == d2.getFullYear();
    }

    createDate(year: number, month: number, day: number): Date {
        // Month in JavaScript's Date constructor is 0-based (January is 0, December is 11)
        return new Date(year, month - 1, day);
    }

    getPreviousSunday(date: Date): Date {
        const previousSunday = new Date(date);
        previousSunday.setDate(date.getDate() - date.getDay());
        return previousSunday;
    }

    convertDates<T>(data: T): T {
        if (Array.isArray(data)) {
            return data.map((item) => this.convertDates(item)) as T;
        } else if (data !== null && typeof data === 'object') {
            const newData = { ...data } as Record<string, any>;

            for (const key in newData) {
                if (typeof newData[key] === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(newData[key])) {
                    const [year, month, day] = newData[key].split('-').map(Number);
                    const localDate = new Date();
                    localDate.setFullYear(year, month - 1, day);
                    localDate.setHours(0, 0, 0, 0); // Ensure time is at midnight
                    newData[key] = localDate;
                } else if (typeof newData[key] === 'object' && newData[key] !== null) {
                    newData[key] = this.convertDates(newData[key]);
                }
            }

            return newData as T;
        }

        return data;
    }

    getHourStringFromMinutes(totalMinutes: number): string {
        const isNegative = totalMinutes < 0;
        const absMinutes = Math.abs(totalMinutes);

        const hours = Math.floor(absMinutes / 60);
        const minutes = absMinutes % 60;

        const result = `${hours.toString()}:${minutes.toString().padStart(2, '0')}`;

        return isNegative ? `-${result}` : result;
    }
}
