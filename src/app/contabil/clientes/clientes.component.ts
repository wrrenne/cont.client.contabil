import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    standalone: true,
    imports: [RouterOutlet],
})
export class ClientesComponent {}
