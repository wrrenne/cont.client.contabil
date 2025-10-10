import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'real-time-clock',
    templateUrl: './real-time-clock.html'
})
export class RealTimeClockComponent implements OnInit, OnDestroy {
    currentTime: string = '';
    private intervalId: any;

    ngOnInit(): void {
        this.updateTime();
        this.intervalId = setInterval(() => this.updateTime(), 1000);
    }

    ngOnDestroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    private updateTime(): void {
        const now = new Date();
        this.currentTime = now.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(',', '');
    }
}
