import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../models';
import { ApisUtilsService, TMicroService } from '../../../services';
import { Vars } from '../../../variables';
import { PastaSelect } from '../../models/selects';
import { environment } from '../../../../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class PastasSelectService extends ServicePagingBase<PastaSelect> {

    constructor(
        injector: Injector,
        vars: Vars,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiGed)}/arquivo/PastasSelectGet/${vars.cadastro?.id}/${environment.sistema}`, injector)
    }
}
