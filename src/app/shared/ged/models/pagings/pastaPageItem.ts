import { ArquivoPageItem } from ".";
import { PageItemBase } from "../../../models";

export interface PastaPageItem extends PageItemBase {
    pastaId?: number;
    nome: string;
    pastaCodigo: string;
    arquivosCount?: number;
    pastasCount?: number;
    nivel: number;
    arquivosPastasCountFormat: string;
    topFolder?: boolean;
    pastas: PastaPageItem[];
    arquivos: ArquivoPageItem[];
}
