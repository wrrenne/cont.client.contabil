import { FolderItem } from '../folderItem';

export interface PastaView {
    id: number;
    cadastroId?: number;
    cadastroNome: string;
    nome: string;
    pastaId: number;
    pastaCaminho: string;
    pastaCaminhoResumido: string;
    pastaCaminhoList: FolderItem[];
    arquivosCount?: number;
    pastasCount?: number;
    dataHora: string;
    arquivosCountFormat: string;
}
