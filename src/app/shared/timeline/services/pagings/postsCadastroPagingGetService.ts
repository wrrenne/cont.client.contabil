import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../models';
import { ApisUtilsService, TMicroService } from '../../../services';
import { Vars } from '../../../variables';
import { PostPageItem } from '../../models/pagings';


@Injectable({
    providedIn: 'root'
})

export class PostsCadastroPagingGetService extends ServicePagingBase<PostPageItem> {

    constructor(
        injector: Injector,
        vars: Vars,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Post/PostsCadastroPagingGet/${vars.cadastro?.id}`, injector)
    }
}
