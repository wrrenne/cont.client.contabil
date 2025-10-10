import { PageItemBase } from "../../../../shared/models";

export interface ObrigacaoDepartamentoPageItem extends PageItemBase {
    obrigacaoId?: number;
    obrigacaoDescricao: string;
    departamentoId?: number;
    departamentoNome: string;
    porcentagem?: number;
    nota?: number;
}
