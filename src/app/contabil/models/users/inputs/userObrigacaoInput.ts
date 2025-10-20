import { InputBase } from 'src/app/shared/models';

export interface UserObrigacaoInput extends InputBase {
    cadastroId: number;
    userId: number;
    obrigacaoId: number;
    mesInicial: string;
    mesFinal?: string;
}
