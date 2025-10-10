import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AppLayout } from '../layouts/app-layout';
import { UserLoginService } from '../login/services/userLogin.service';
import { ControlService } from '../shared/control/services/control.service';
import { SistemaTipo } from '../shared/models';
import { LoginInput } from '../shared/models/inputs';
import { Vars } from '../shared/variables';

@Component({
    selector: 'app-contabil',
    standalone: true,
    imports: [RouterOutlet, AppLayout],
    templateUrl: './contabil.component.html',
})
export class ContabilComponent {
    constructor(
        private router: Router,
        private vars: Vars,
        private controlService: ControlService,
        private userLoginService: UserLoginService,
    ) {
        if (this.vars.user == null || this.vars.cadastro == null) {
            this.router.navigate(['/login']);
        } else {
            if (!this.vars.loaded) {
                if (this.vars.user.p == null) {
                    this.router.navigate(['/login']);
                }

                const l: LoginInput = {
                    u: this.vars.user.email,
                    p: this.vars.user.p,
                    c: this.vars.cadastro.id,
                    sistemaId: SistemaTipo.Contabil,
                };

                this.loginFlow(l);

                // this.controlService.login(l).subscribe((x) => {
                //     if (x.errorMessage == null) {
                //         this.userLoginService.userPainelGet(<number>x.obj.userId, x.obj.cadastroId!, false);
                //     } else {
                //         this.router.navigate(['/login']);
                //     }
                // });
            }
        }
    }

    async loginFlow(l: LoginInput) {
        try {
            const x = await firstValueFrom(this.controlService.login(l));
            if (x.errorMessage == null) {
                await this.userLoginService.userPainelGet(<number>x.obj.userId, x.obj.cadastroId!, false);
                this.vars.token = x.obj.token;
            } else {
                this.router.navigate(['/login']);
            }
        } catch (err) {
            console.error('Login failed', err);
            this.router.navigate(['/login']);
        }
    }
}
