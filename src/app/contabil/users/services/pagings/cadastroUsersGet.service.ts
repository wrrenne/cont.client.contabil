import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, DateUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ContabilUserPageItem } from '../../../models/users/pageItems';


@Injectable({
    providedIn: 'root'
})

export class CadastroUsersService extends ServicePagingBase<ContabilUserPageItem> {

    constructor(
        injector: Injector,
        vars: Vars,
        apisUtilsService: ApisUtilsService,
        dateUtilsService: DateUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabil)}/Users/CadastroUsersPagingGet/${vars.cadastro?.id}/${dateUtilsService.firstDateOfCurrentMonthIso()}`, injector)
    }
}
