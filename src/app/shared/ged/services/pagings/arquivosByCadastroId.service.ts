import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../models';
import { ApisUtilsService, TMicroService } from '../../../services';
import { Vars } from '../../../variables';
import { ArquivoPageItem } from '../../models/pagings';

@Injectable({
    providedIn: 'root',
})
export class ArquivosByCadastroIdService extends ServicePagingBase<ArquivoPageItem> {
    constructor(injector: Injector, apisUtilsService: ApisUtilsService, vars: Vars) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiGed)}/arquivo/ArquivosByCadastroIdPagingGet/${vars.cadastro?.id}`, injector);
    }
}
