import { PageItemBase, SistemaTipo } from "../../../models";
import { PacotePageItem } from "../planos/pagings";

export interface SistemaCadastroPageItem extends PageItemBase {
    sistemaId: SistemaTipo;
    sistemaDescricao: string;
    dataInicial: Date;
    pacote?: PacotePageItem;
    usersCount: number;
    ultimoAcesso?: Date;
    ultimoAcessoUserId?: number;
    userAcessoUserNome: string;
}
