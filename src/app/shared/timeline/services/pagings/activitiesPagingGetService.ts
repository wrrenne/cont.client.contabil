import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ServicePagingBase } from '../../../models';
import { ApisUtilsService, TMicroService } from '../../../services';
import { Vars } from '../../../variables';
import { ActivityPageItem } from '../../models/pagings';

@Injectable({
    providedIn: 'root',
})
export class ActivitiesPagingGetService extends ServicePagingBase<ActivityPageItem> {
    constructor(injector: Injector, vars: Vars, apisUtilsService: ApisUtilsService) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Activities/ActivitiesPagingGet/${environment.sistema}/${vars.cadastro?.id}`, injector);
    }
}
