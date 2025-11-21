import { PageItemBase } from '../../../../shared/models';
import { ObrigacoesStat } from '../../obrigacoes';
import { ContUserPageItem } from '../../users/pageItems';

export interface DepartamentoPageItem extends PageItemBase {
    cadastroId: number;
    nome: string;
    cor: string;
    users: ContUserPageItem[];
    obrigacoesCount?: number;
    obrigacoesStat?: ObrigacoesStat;
}
