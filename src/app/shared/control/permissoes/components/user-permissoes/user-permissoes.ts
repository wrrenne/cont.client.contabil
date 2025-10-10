
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { environment } from '../../../../../../environments/environment';
import { Vars } from '../../../../variables';
import { UserPermissaoInput } from '../../models/inputs';
import { UserPermissaoView, UserPermissoesView } from '../../models/views';
import { PermissoesService } from '../../services/permissoes.service';

@Component({
    selector: 'user-permissoes',
    standalone: true,
    imports: [FormsModule, NzCheckboxModule],
    templateUrl: './user-permissoes.html'
})
export class UserPermissoesComponent {

    data: UserPermissoesView

    private _id: number
    @Input() get id() {
        return this._id
    } set id(value: number | undefined) {
        if (value == undefined) return

        this._id = value

        this.getData(value)
    }

    constructor(
        private permissoesService: PermissoesService,
        private vars: Vars
    ) {
    }

    getData(id: number) {
        this.permissoesService.userPermissoesGet(id).subscribe(x => {
            this.data = x.obj
        })
    }

    get isDebug() {
        return environment.debug
    }

    valorChange(e: boolean, regra: UserPermissaoView) {
        const input: UserPermissaoInput = {
            userId: this.id,
            cadastroId: this.vars.cadastro?.id!,
            sistemaId: environment.sistema,
            permissaoId: regra.permissaoId,
            valor: regra.valor
        }

        this.permissoesService.userPermissaoSet(input).subscribe()
    }
}
