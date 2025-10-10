import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, DateUtilsService, TMicroService } from '../../../services';
import { Vars } from '../../../variables';
import { environment } from '../../../../../environments/environment.prod';
import { UserPageItem } from '../../models/pagings';


@Injectable({
    providedIn: 'root'
})

export class UsersPagingService extends ServicePagingBase<UserPageItem> {

    constructor(
        vars: Vars,
        injector: Injector,
        dateUtilsService: DateUtilsService,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Users/CadastroUsersPagingGet/${vars.cadastro?.id}/${environment.sistema}/${dateUtilsService.firstDateOfCurrentMonthIso()}`, injector)
    }
}
