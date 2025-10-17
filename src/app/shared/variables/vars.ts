import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CadastroModel, DashboardConfigModel, DepartamentoModel, FuncionarioModel, PeriodoModel, SistemaTipo, UserInterno } from '../models';
import { SearchModel } from '../models/searchModel';

@Injectable({
    providedIn: 'root',
})
export class Vars {
    //public searchObservable = new Subject<SearchModel>();

    //searchEmit(search: SearchModel) {
    //    this.searchObservable.next(search);
    //}

    getVarName(name: string) {
        return `${environment.sistemaPrefix}:${name}`;
    }

    private periodoSubject = new Subject<PeriodoModel>();
    periodo$ = this.periodoSubject.asObservable();

    periodoEmit(newValue: PeriodoModel) {
        this.periodoSubject.next(newValue);
    }

    get user(): UserInterno | null {
        if (localStorage.getItem(this.getVarName('user')) == null) return null;
        else return JSON.parse(<string>localStorage.getItem(this.getVarName('user')));
    }
    set user(value: UserInterno | null) {
        if (value == null) localStorage.removeItem(this.getVarName('user'));
        else localStorage.setItem(this.getVarName('user'), JSON.stringify(value));
    }

    get cadastro(): CadastroModel | null {
        if (localStorage.getItem(this.getVarName('cadastro')) == null) return null;
        else return JSON.parse(<string>localStorage.getItem(this.getVarName('cadastro')));
    }
    set cadastro(value: CadastroModel | null) {
        if (value == null) localStorage.removeItem(this.getVarName('cadastro'));
        else localStorage.setItem(this.getVarName('cadastro'), JSON.stringify(value));
    }

    get search(): SearchModel | null {
        if (sessionStorage.getItem(this.getVarName('search')) == null) return new SearchModel();
        else return JSON.parse(<string>sessionStorage.getItem(this.getVarName('search')));
    }
    set search(value: SearchModel | null) {
        if (value == null) sessionStorage.removeItem(this.getVarName('search'));
        else {
            sessionStorage.setItem(this.getVarName('search'), JSON.stringify(value));
        }
    }

    get token(): string | null {
        if (sessionStorage.getItem(this.getVarName('token')) == null) return null;
        else return JSON.parse(sessionStorage.getItem(this.getVarName('token'))!);
    }
    set token(value: string | null | undefined) {
        if (value == null || value == undefined) sessionStorage.removeItem(this.getVarName('token'));
        else {
            sessionStorage.setItem(this.getVarName('token'), JSON.stringify(value));
        }
    }

    get periodo(): PeriodoModel | undefined {
        return this.dataInicial != undefined ? { dataInicial: this.dataInicial!, dataFinal: this.dataFinal! } : undefined;
    }
    set periodo(value: PeriodoModel | undefined) {
        if (value == undefined) {
            this.dataInicial = undefined;
            this.dataFinal = undefined;
        } else {
            this.dataInicial = value.dataInicial;
            this.dataFinal = value.dataFinal;

            this.periodoEmit(value);
        }
    }

    get dataInicial(): Date | undefined {
        if (sessionStorage.getItem(this.getVarName('dataInicial')) == null) return undefined;
        else return new Date(sessionStorage.getItem(this.getVarName('dataInicial'))!);
    }
    set dataInicial(value: Date | undefined) {
        if (value == null) sessionStorage.removeItem(this.getVarName('dataInicial'));
        else sessionStorage.setItem(this.getVarName('dataInicial'), value.toString());
    }

    get dataFinal(): Date | undefined {
        if (sessionStorage.getItem(this.getVarName('dataFinal')) == null) return undefined;
        else return new Date(sessionStorage.getItem(this.getVarName('dataFinal'))!);
    }
    set dataFinal(value: Date | undefined) {
        if (value == null) sessionStorage.removeItem(this.getVarName('dataFinal'));
        else {
            sessionStorage.setItem(this.getVarName('dataFinal'), value.toString());
        }
    }

    get departamento(): DepartamentoModel | null {
        if (sessionStorage.getItem(this.getVarName('departamento')) == null) return null;
        else return JSON.parse(<string>sessionStorage.getItem(this.getVarName('departamento')));
    }
    set departamento(value: DepartamentoModel | null) {
        if (value == null) sessionStorage.removeItem(this.getVarName('departamento'));
        else sessionStorage.setItem(this.getVarName('departamento'), JSON.stringify(value));
    }

    get gedRoot(): number | undefined {
        if (sessionStorage.getItem(this.getVarName('gedRoot')) == null) return undefined;
        else return +sessionStorage.getItem(this.getVarName('gedRoot'))!;
    }
    set gedRoot(value: Date | undefined) {
        if (value == null) sessionStorage.removeItem(this.getVarName('gedRoot'));
        else sessionStorage.setItem(this.getVarName('gedRoot'), value.toString());
    }

    get funcionario(): FuncionarioModel | null {
        if (localStorage.getItem(this.getVarName('funcionario')) == null) return null;
        else return JSON.parse(<string>localStorage.getItem(this.getVarName('funcionario')));
    }
    set funcionario(value: FuncionarioModel | null) {
        if (value == null) localStorage.removeItem(this.getVarName('funcionario'));
        else localStorage.setItem(this.getVarName('funcionario'), JSON.stringify(value));
    }

    get loaded(): boolean {
        return sessionStorage.getItem(this.getVarName('loaded')) != null;
    }
    set loaded(value: boolean) {
        if (value == null || value == false) sessionStorage.removeItem(this.getVarName('loaded'));
        else {
            sessionStorage.setItem(this.getVarName('loaded'), '1');
        }
    }

    get sistemaId(): SistemaTipo | undefined {
        const value: string | null = sessionStorage.getItem('sistemaId');

        return value != null ? <SistemaTipo>+value : SistemaTipo.Nenhum;
    }
    set sistemaId(value: SistemaTipo | undefined) {
        if (!value) sessionStorage.removeItem(this.getVarName('sistemaId'));
        else sessionStorage.setItem('sistemaId', (<number>value).toString());
    }

    get dashBoard(): DashboardConfigModel | null {
        if (sessionStorage.getItem(this.getVarName('dash')) == null) return null;
        else return JSON.parse(<string>sessionStorage.getItem(this.getVarName('dash')));
    }
    set dashBoard(value: DashboardConfigModel | null) {
        if (value == null) sessionStorage.removeItem(this.getVarName('dash'));
        else sessionStorage.setItem(this.getVarName('dash'), JSON.stringify(value));
    }
}
