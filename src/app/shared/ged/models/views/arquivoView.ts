import { TFileSubType, TFileType } from "../../enums/ged-enums";
import { FolderItem } from "../folderItem";

export interface ArquivoView {
    id: number;
    nome: string;
    pastaId: number;
    pastaCaminho: string;
    pastaCaminhoList: FolderItem[];
    conteudo: string;
    conteudoAsString: string;
    fileType: TFileType;
    fileTypeDescricao: string;
    fileSubType?: TFileSubType;
    fileSubTypeDescricao: string;
    tamanho?: number;
    userId?: number;
    userNome: string;
    conteudoAsHtml: string;
    dataHora: string;
    convertToPdf: boolean;
    competenciaMes?: string;
    competenciaMesFormat: string;
    competenciaAno?: number;
    funcionarioId?: number;
    funcionarioNome: string;
    mimeType: string;
}