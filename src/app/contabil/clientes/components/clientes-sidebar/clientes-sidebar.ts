import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PagingBase } from '../../../../shared/models';
import { EncryptionService, SystemUtilsService } from '../../../../shared/services';
import { ClientesParameter } from '../../../models/clientes/parameters';
import { PerfilItemView } from '../../../models/obrigacoes/views/perfilItemView';
import { PerfisService } from '../../../obrigacoes/services/perfis.service';
import { ClientesPagingService } from '../../services/pagings/clientes.service';
import { ContabilClientePageItem } from '../../../models/clientes/pageItems';

@Component({
    selector: 'clientes-sidebar',
    templateUrl: './clientes-sidebar.html',
    standalone: true
})
export class ClientesSidebarComponent extends PagingBase<ContabilClientePageItem> implements OnInit {

    descriptionBase = { none: "", plural: "{0} clientes", singular: "1 cliente" }

    perfilItem: Partial<PerfilItemView> = {}
    searchText?: string

    @Output() onClick = new EventEmitter<number>()

    private _parameters?: ClientesParameter
    @Input() get parameters() {
        return this._parameters
    }
    set parameters(value: ClientesParameter | undefined) {
        if (!value) return

        if (this.systemUtilsService.compare(value, this.parameters)) return;

        this._parameters = value

        this.param.routeStrings = []

        this.param.queryStrings.clear()

        //if (value?.perfilItemId != undefined) {
        //    this.param.queryStrings.set('pi', value.perfilItemId)
        //}
        //else {
        //    this.param.queryStrings.set('pi', 0)
        //}

        if (value?.perfilItemId && value?.perfilItemId != 0) {
            this.perfisService.perfilItemGet(value?.perfilItemId).subscribe(x => this.perfilItem = x.obj)
            this.param.queryStrings.set('pi', value.perfilItemId)
        }
        else {
            this.perfilItem = { id: 0, descricao: "Todos os clientes" }
            this.param.queryStrings.set('pi', 0)
        }

        this.param.q = value?.searchText

        if (value?.searchText)
            this.searchText = value?.searchText
        else
            this.searchText = undefined

        this.refresh()
    }

    constructor(
        injector: Injector,
        clientesPagingService: ClientesPagingService,
        private router: Router,
        private encryption: EncryptionService,
        private perfisService: PerfisService,
        private systemUtilsService: SystemUtilsService
    ) {
        super(
            injector,
            clientesPagingService
        )
    }

    //override ngOnInit(): void {
    //    const urlParametrs = combineLatest([this.route.params,
    //    this.route.queryParams], (params, queryParams) => ({
    //        ...params, ...queryParams
    //    }));

    //    urlParametrs.subscribe(r => {
    //        this.parameters = { perfilItemId: r['pi'], searchText: r['q'] }
    //    });

    //    super.ngOnInit()
    //}

    //openCliente(id: number) {
    //    this.router.navigate(['/sistema/clientes/cliente', this.encryption.set(id)], { queryParams: { perfilItemId: this.parameters?.perfilItemId } });
    //    //this.clientesModalsService.openCliente(id)
    //}

    getEnc(id: number) {
        return this.encryption.encrypt(id)
    }

    getSubTitle(): string {
        return this.stringsService.getSingularPlural(this.perfilItem?.clientesCount ?? 0, "Nenhum cliente", "1 cliente", "{0} clientes")
    }
}
