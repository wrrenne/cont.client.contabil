import { InputBase } from '../../../../shared/models';

export interface PerfilClienteInput extends InputBase {
    cadastroId: number;
    clienteId: number;
    perfilItemId: number;
    competenciaInicial: string;
    userId: number;
    comentario: string;
}
