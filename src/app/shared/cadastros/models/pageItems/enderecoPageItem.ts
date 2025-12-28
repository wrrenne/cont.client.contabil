import { TEnderecoTipo } from '../../../enums';
import { PageItemBase } from '../../../models';

export interface EnderecoPageItem extends PageItemBase {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    municipioCodigo?: number;
    municipioTexto: string;
    uf: string;
    cep: string;
    cepFormat: string;
    tipo?: TEnderecoTipo;
    tipoDescricao?: string;
    enderecoFormat: string[];
}
