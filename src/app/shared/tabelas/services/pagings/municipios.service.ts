import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../models';
import { ApisUtilsService, TMicroService } from '../../../services';
import { MunicipioPageItem } from '../../models/pageItems';


@Injectable({
    providedIn: 'root'
})

export class MunicipiosPagingService extends ServicePagingBase<MunicipioPageItem> {

    constructor(
        injector: Injector,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiTabelas)}/municipios/MunicipiosPagingGet`, injector)
    }
}
