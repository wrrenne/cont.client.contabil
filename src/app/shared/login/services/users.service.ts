import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceBase } from '../../models';
import { Vars } from '../../variables';


@Injectable({
    providedIn: 'root'
})

export class UsersService<T> extends ServiceBase {

    constructor(
        public injector: Injector,
        private router: Router,
        private vars: Vars
    ) {
        super(injector)
    }

    signOut() {
        this.vars.user = null
        this.vars.cadastro = null
        this.vars.token = null
        this.vars.loaded = false
        this.router.navigate(['/login/']);
    }
}
