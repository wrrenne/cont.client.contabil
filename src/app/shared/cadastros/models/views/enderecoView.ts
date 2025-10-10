import { TEnderecoTipo } from "../../../enums";
import { ViewBase } from "../../../models";

export interface EnderecoView extends ViewBase {
    cadastroId?: number;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    municipioCodigo?: number;
    municipioTexto?: string;
    uf?: string;
    cep?: string;
    cepFormat?: string;
    tipo?: TEnderecoTipo;
    tipoDescricao?: string;
    enderecoFormat?: string[];
}
