
import { Component } from '@angular/core';
import { ClientesService } from '../../../contabil/clientes/services/clientes.service';
import { toggleAnimation } from '../../../shared/animations';
import { SearchComponent } from '../../../shared/controls/search/search';
import { ListItem } from '../../../shared/models';
import { MessageService } from '../../../shared/services';
import { ClientesSearchComponent } from '../clientes-search/clientes-search';

@Component({
    selector: 'app-search',
    templateUrl: './app-search.html',
    standalone: true,
    imports: [ClientesSearchComponent, SearchComponent],
    animations: [toggleAnimation]
})
export class AppSearchComponent {

    clientes: ListItem[]
    formVisible?: boolean = undefined

    constructor(
        private clientesService: ClientesService,
        private messageService: MessageService<boolean>) {
    }

    query(e: any) {
        if (e != '') {
            this.clientesService.clientesSearchGet(e).subscribe(x => {
                this.clientes = x.obj
            })
        }
        else {
            this.clientesService.clientesUltimosGet().subscribe(x => {
                this.clientes = x.obj
            })
        }
    }

    searchClick(e: any) {
        this.messageService.sendCommand(false)
    }

    openBox() {
        this.clientesService.clientesUltimosGet().subscribe(x => {
            this.clientes = x.obj
        })
    }
}
