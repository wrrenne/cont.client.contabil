export interface UserDepartamentoPermissoesView {
    userNome: string;
    departamentos: UserPermissaoDepartamentoView[];
}

export interface UserPermissaoDepartamentoView {
    departamentoId: number;
    departamentoNome: string;
}
