import { TTipoPessoa } from "../../../enums";
import { PageItemBase } from "../../../models";

export interface CadastroPageItem extends PageItemBase {
    nome: string;
    tipo: TTipoPessoa;
    cpf: string;
    cpfFormat: string;
    cnpj: string;
    cnpjFormat: string;
    inscricaoEstadual: string;
    ultimoAcesso?: Date;
    ultimoAcessoUsuarioNome: string;
    ultimoAcessoUsuarioId?: number;
}
