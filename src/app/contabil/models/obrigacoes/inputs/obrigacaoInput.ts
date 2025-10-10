import { AcessoriaAnualInput, AcessoriaMensalInput, ImpostoAnualInput, ImpostoMensalInput, RelatorioAnualInput, RelatorioMensalInput } from ".";
import { TSetor } from "../../../../shared/enums";
import { InputBase } from "../../../../shared/models";
import { TEsfera, TObrigacaoTipo, TPeriodicidade } from "../../enums";

export interface ObrigacaoInput extends InputBase {
    cadastroId?: number;
    descricao?: string;
    tipo?: TObrigacaoTipo;
    periodicidade?: TPeriodicidade;
    esfera?: TEsfera;
    uf?: string;
    municipioCodigo?: number;
    municipioNome?: string;
    //setor?: TSetor;
    departamentoId?: number;
    impostoMensal?: ImpostoMensalInput;
    impostoAnual?: ImpostoAnualInput;
    relatorioMensal?: RelatorioMensalInput;
    relatorioAnual?: RelatorioAnualInput;
    acessoriaMensal?: AcessoriaMensalInput;
    acessoriaAnual?: AcessoriaAnualInput;
    originalId?: number;
    gedPastaCodigo?: string;
    identificadorArquivo?: string;
    userId: number;
    comentario: string;
}
