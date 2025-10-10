import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest } from 'rxjs';
import { Profile2Component } from 'src/app/shared/controls/profile2/profile2';
import { UserPreferencesService } from '../../../../shared/control/userPreferences/services/userPreferences.service';
import { GedService } from '../../../../shared/ged/services/ged.service';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { DepartamentoView } from '../../../models/contabil/views';
import { DepartamentosService } from '../../services/departamentos.service';

@Component({
    selector: 'departamento',
    standalone: true,
    templateUrl: './departamento.html',
    imports: [Profile2Component, NzTabsModule],
})
export class DepartamentoPage implements OnInit {
    departamento: DepartamentoView;
    tabIndex: number = 0;

    firstFormGroup: FormGroup;

    mes: Date;

    constructor(
        private route: ActivatedRoute,
        private departamentosService: DepartamentosService,
        private encryptionService: EncryptionService,
        private userPreferencesService: UserPreferencesService,
        private gedService: GedService,
        private vars: Vars,
        dateUtilsService: DateUtilsService,
    ) {
        this.mes = dateUtilsService.firstDateOfCurrentMonth();
    }

    ngOnInit(): void {
        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            const id: number = this.encryptionService.decrypt(r['id']);
            this.getData(id);
        });
    }

    getData(id: number) {
        this.departamentosService.departamentoGet(id).subscribe((x) => {
            this.departamento = x.obj;
        });
    }
}
