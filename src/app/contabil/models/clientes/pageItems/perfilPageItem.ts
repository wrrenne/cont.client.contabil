import { PageItemBase } from '../../../../shared/models';
import { ObrigacoesStat } from '../../obrigacoes';

export interface PerfilPageItem extends PageItemBase {
    perfilItemId?: number;
    perfilItemDescricao: string;
    perfilDescricao: string;
    descricao: string;
    perfilId?: number;
    cor: string;
    avatarFileName: string;
    obrigacoesCount: number;
    clientesCount: number;
    obrigacoesStat?: ObrigacoesStat;
}
