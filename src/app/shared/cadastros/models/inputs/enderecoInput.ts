import { TEnderecoTipo } from "../../../enums";
import { InputBase } from "../../../models";

export interface EnderecoInput extends InputBase {
    cadastroId?: number;
    cadastroOriginalId?: number;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    municipioCodigo?: number;
    uf: string;
    cep: string;
    tipo: TEnderecoTipo;
    userId?: number;
    comentario?: string;
}
