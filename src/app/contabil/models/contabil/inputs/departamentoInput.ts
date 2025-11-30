import { InputBase } from 'src/app/shared/models';

export interface DepartamentoInput extends InputBase {
    cadastroId: number;
    nome: string;
    userId: number;
    comentario: string;
}
