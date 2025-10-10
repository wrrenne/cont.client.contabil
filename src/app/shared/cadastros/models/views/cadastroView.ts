import { ContatoView, EnderecoView } from ".";
import { TTipoPessoa } from "../../../enums";
import { ViewBase } from "../../../models";

export interface CadastroView extends ViewBase {
    cadastroId?: number;
    revendaId?: number;
    originalId?: number;
    numero?: number;
    nome: string;
    tipo: TTipoPessoa;
    tipoRevenda: boolean;
    tipoContabilidade: boolean;
    cpf: string;
    cpfFormat: string;
    cnpj: string;
    cnpjFormat: string;
    inscricaoEstadual: string;
    enderecos: EnderecoView[];
    contatos: ContatoView[];
}
