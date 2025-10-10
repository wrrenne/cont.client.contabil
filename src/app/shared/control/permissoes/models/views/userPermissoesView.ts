export interface UserPermissoesView {
    grupos: UserPermissoesGrupoView[];
}

export interface UserPermissoesGrupoView {
    nome: string;
    permissoes: UserPermissaoView[];
}

export interface UserPermissaoView {
    permissaoId: number;
    permissaoNome: string;
    valor: boolean;
}