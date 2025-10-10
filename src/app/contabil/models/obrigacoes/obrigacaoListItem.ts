import { ListItem } from "../../../shared/models";
import { TObrigacaoTipo, TPeriodicidade } from "../enums";

export interface ObrigacaoListItem extends ListItem {
    periodicidade: TPeriodicidade;
    periodicidadeDescricao?: string;
    departamentoId: number;
    departamentoNome: string;
    tipo: TObrigacaoTipo;
    tipoDescricao?: string;
}
