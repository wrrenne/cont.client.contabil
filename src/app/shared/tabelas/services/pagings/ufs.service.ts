import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../models';
import { ApisUtilsService, TMicroService } from '../../../services';
import { UfPageItem } from '../../models/pageItems';


@Injectable({
    providedIn: 'root'
})

export class UfsPagingService extends ServicePagingBase<UfPageItem> {

    constructor(
        injector: Injector,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiTabelas)}/ufs/UfsPagingGet`, injector)
    }
}
