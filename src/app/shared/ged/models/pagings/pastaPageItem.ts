import { ArquivoPageItem } from '.';
import { PageItemBase } from '../../../models';

export interface PastaPageItem extends PageItemBase {
    pastaId?: number;
    nome: string;
    pastaCodigo: string;
    cadastroId?: number;
    arquivosCount?: number;
    pastasCount?: number;
    nivel: number;
    root?: boolean;
    arquivosPastasCountFormat: string;
    topFolder?: boolean;
    openFolder?: boolean;
    pastas: PastaPageItem[];
    arquivos: ArquivoPageItem[];
}
