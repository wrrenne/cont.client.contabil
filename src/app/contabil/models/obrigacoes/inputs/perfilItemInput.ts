import { ObrigacaoInput } from ".";
import { InputBase } from "../../../../shared/models";

export interface PerfilItemInput extends InputBase {
    descricao: string;
    perfilDescricao?: string;
    perfilId?: number;
    obrigacoes?: ObrigacaoInput[];
}
