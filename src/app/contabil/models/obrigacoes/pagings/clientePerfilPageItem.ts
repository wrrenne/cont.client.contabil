import { ObrigacoesStat } from "..";
import { PageItemBase } from "../../../../shared/models";

export interface ClientePerfilPageItem extends PageItemBase {
    perfilItemId: number;
    descricao: string;
    clienteNome: string;
    clienteId?: number;
    cor: string;
    avatarFileName: string;
    competenciaInicial: string;
    obrigacoesStat: ObrigacoesStat;
}
