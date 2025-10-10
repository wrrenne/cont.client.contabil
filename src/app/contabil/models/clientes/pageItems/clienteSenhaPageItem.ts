import { TSetor } from "../../../../shared/enums";

export interface ClienteSenhaPageItem {
    id: number;
    senhaTipoId: number;
    senhaTipoDescricao: string;
    usuario: string;
    senhaAcesso: string;
    setorNome: string;
    setor: TSetor;
    cpf: string;
    codigoAcesso: string;
    data: string;
    validade: string | null;
}