import { Component, Input } from '@angular/core';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { StringsService } from '../../../../shared/services';
import { ObrigacaoClientePeriodoUserPageItem } from '../../../models/obrigacoes/pagings';

@Component({
    selector: 'obrigacao-resumo-users',
    templateUrl: './obrigacao-resumo-users.html',
    imports: [AvatarTitleComponent],
})
export class ObrigacoesResumoUsersComponent {
    @Input() users: ObrigacaoClientePeriodoUserPageItem[];

    constructor(private stringsService: StringsService) {}

    getPercentagemColor(percentage: number): string {
        if (percentage <= 25) {
            return 'text-red-500'; // Red (from-red-500)
        } else if (percentage > 25 && percentage <= 50) {
            return 'text-yellow-500'; // Yellow (from-yellow-500)
        } else if (percentage > 50 && percentage <= 75) {
            return 'text-green-500'; // Green (from-green-500)
        } else {
            return 'text-blue-500'; // Blue (from-blue-500)
        }
    }

    getPlural(n: number): string {
        return this.stringsService.getSingularPlural(n, 'Nenhuma obrigação concluída', '1 obrigação concluída', '{0} obrigações concluídas');
    }
}
