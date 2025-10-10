import { CadastroView } from "../../../cadastros/models/views";
import { SistemaTipo, ViewBase } from "../../../models";

export interface SistemaCadastroView extends ViewBase {
    revendaId: number;
    cadastroId: number;
    cadastro: CadastroView;
    sistemaId: SistemaTipo;
    dataInicial: Date;
    dataFinal?: Date;
    pacoteId?: number;
    pacote: SistemaCadastroPacoteView;
}

export interface SistemaCadastroPacoteView {
    id: number;
    descricao: string;
    quantidadeDe?: number;
    quantidadeAte?: number;
    funcionariosQuantidade?: number;
    porcentagem?: number;
}
