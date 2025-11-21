import { ViewBase } from '../../../../shared/models';
import { ObrigacoesStat } from '../../obrigacoes';
import { ContUserPageItem } from '../../users/pageItems';

export interface DepartamentoView extends ViewBase {
    cadastroId: number;
    nome: string;
    cor: string;
    users: ContUserPageItem[];
    obrigacoesCount: number;
    obrigacoesStat: ObrigacoesStat;
}
