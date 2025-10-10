import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateUtilsService } from '../../../shared/services';
import { Vars } from '../../../shared/variables';

@Component({
    selector: 'home',
    templateUrl: './home.html',
    standalone: true
})
export class ContabilHomePage {

    datas = [this.dateUtilsService.firstDateOfCurrentMonth(), this.dateUtilsService.lastDateOfCurrentMonth()]

    nome: string
    constructor(
        private router: Router,
        protected route: ActivatedRoute,
        public vars: Vars,
        private dateUtilsService: DateUtilsService
    ) {
    }
}
