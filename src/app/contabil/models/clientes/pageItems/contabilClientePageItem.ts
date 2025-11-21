import { ClientePageItem } from '../../../../shared/cadastros/models/pageItems';
import { ObrigacoesStat } from '../../obrigacoes';
import { ClientePerfilPageItem } from '../../obrigacoes/pagings';
import { ContUserPageItem } from '../../users/pageItems';

export interface ContabilClientePageItem extends ClientePageItem {
    perfisSecundarios: ClientePerfilPageItem[];
    users: ContUserPageItem[];
    regime?: string;
    perfisCount: number;
    obrigacoesStat?: ObrigacoesStat;
}
