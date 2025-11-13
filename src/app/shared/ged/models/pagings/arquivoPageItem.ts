import { PageItemBase } from '../../../models';
import { TFileSubType, TFileType } from '../../enums/ged-enums';

export interface ArquivoPageItem extends PageItemBase {
    nome: string;
    descricao: string;
    nomeFormatado: string;
    extensao: string;
    groupTitle?: string;
    pastaId?: number;
    dataHora?: string;
    tamanho?: number;
    userId?: number;
    userNome: string;
    fileType?: TFileType;
    fileTypeDescricao?: string;
    fileSubType?: TFileSubType;
    fileSubTypeDescricao?: string;
    competenciaMes?: string;
    competenciaMesFormat?: string;
    competenciaAno?: number;
    funcionarioId?: number;
    funcionarioNome?: string;
    apontamentoData?: string;
    apontamentoDataFormat?: string;
    nivel?: number;
}
