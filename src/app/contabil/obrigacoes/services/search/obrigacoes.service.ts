import { Injectable, Injector } from '@angular/core';
import { ServiceSearchBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';


@Injectable({
    providedIn: 'root'
})

export class ObrigacoesSearchService extends ServiceSearchBase {

    constructor(
        vars: Vars,
        injector: Injector,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Obrigacoes/ObrigacoesSearchGet/${vars.cadastro?.id}`, injector)
    }
}
