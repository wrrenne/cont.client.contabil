export interface LoginOutput {
    ultimoAcesso?: string;
    userId?: number;
    cadastroId?: number;
    revendaId?: number;
    token?: string | null;
    sistemasCount: number;
}
