import { InputBase } from 'src/app/shared/models';

export interface ObrigacaoClienteInput extends InputBase {
    cadastroId: number;
    clienteId: number;
    obrigacaoId: number;
    competenciaInicial?: Date;
    competenciaAnoInicial?: number;
    userId: number;
    comentario: string;
}
