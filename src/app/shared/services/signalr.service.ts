import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs/internal/Observable';
import { ProgressModel } from '../models';
import { HttpTransportType } from '@microsoft/signalr';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    private hubConnection!: signalR.HubConnection;
    signalrId: string | null = null;

    mystatusChanged: EventEmitter<ProgressModel> = new EventEmitter();

    constructor() { }

    startConnection(url: string): Observable<string> {
        console.log(['url'], url)
        return new Observable(observer => {
            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(url,
                    {
                        skipNegotiation: true,
                        transport: HttpTransportType.WebSockets
                    }
                )
                .withAutomaticReconnect()
                .build();

            this.hubConnection.start()
                .then(() => {
                    console.log('SignalR connected!');

                    this.listenForProgress();
                    this.listenForCompletion();

                    // Get the connection ID from SignalR
                    this.hubConnection.invoke('GetConnectionId')
                        .then((id: string) => {
                            console.log('Received Connection ID:', id);
                            this.signalrId = id;

                            observer.next(this.signalrId!);
                            observer.complete();
                        })
                        .catch(err => console.error('Error getting connection ID:', err));
                })
                .catch(err => {
                    console.error('Error while starting connection:', err);
                    observer.error(err);
                });
        });
    }

    listenForProgress(): void {
        this.hubConnection.on('ReceiveProgress', (progress: ProgressModel) => {
            this.mystatusChanged.emit(progress);
        });
    }

    listenForCompletion(): void {
        this.hubConnection.on('TaskCompleted', (message: string) => {
            console.log('✅ Task Completed:', message);

            // Close connection when task is done
            this.hubConnection.stop()
                .then(() => console.log('SignalR connection closed'))
                .catch(err => console.error('Error closing SignalR connection:', err));
        });
    }

    onProgressUpdate(callback: (progress: ProgressModel) => void): void {
        this.hubConnection.on('ReceiveProgress', (progress) => {
            console.log(progress)
            callback(progress);
        });
    }
}
