import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { EnderecoPageItem } from '../../models/pageItems';


@Injectable({
    providedIn: 'root'
})

export class EnderecosPagingService extends ServicePagingBase<EnderecoPageItem> {

    constructor(
        injector: Injector,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiCadastros)}/Cadastros/CadastroEnderecosPagingGet`, injector)
    }
}
