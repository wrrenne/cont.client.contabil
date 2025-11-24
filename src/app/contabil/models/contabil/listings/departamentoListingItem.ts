import { ListingItemBase } from 'src/app/shared/models';

export interface DepartamentoListingItem extends ListingItemBase {
    nome: string;
    fiscal: boolean;
    contabil: boolean;
    pessoal: boolean;
    administracao: boolean;
    legalizacao: boolean;
    users: DepartamentoUserListingItem[];
}

export interface DepartamentoUserListingItem extends ListingItemBase {
    nome: string;
}
