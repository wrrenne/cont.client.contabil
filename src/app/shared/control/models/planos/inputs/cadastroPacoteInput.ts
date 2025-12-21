import { SistemaTipo } from 'src/app/shared/models';

export interface CadastroPacoteInput {
    pacoteId: number;
    sistemaId: SistemaTipo;
    userId: number;
}
