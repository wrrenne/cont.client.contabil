import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse, ListItem, ServiceBase } from '../../models';
import { ApisUtilsService, TMicroService } from '../../services';
import { CadastroClienteInput, CadastroInput, EnderecoInput } from '../models/inputs';
import { CadastroView, EnderecoView } from '../models/views';
import { Vars } from '../../variables';


@Injectable({
    providedIn: 'root'
})

export class CadastrosService extends ServiceBase {

    constructor(
        public injector: Injector,
        private apisUtilsService: ApisUtilsService,
        private vars: Vars
    ) {
        super(injector)
    }

    cadastroByCnpjGet(cnpj: string): Observable<ApiResponse<CadastroView>> {
        return this.http.get<ApiResponse<CadastroView>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiCadastros)}/Cadastros/CadastroByCnpjGet/${cnpj}`)
            .pipe(catchError(this.handleError))
    }

    cadastroCreateOrUpdate(input: CadastroInput): Observable<ApiResponse<CadastroView[]>> {
        return this.http.post<ApiResponse<CadastroView[]>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiCadastros)}/Cadastros/CadastroCreateOrUpdate`, [input], this.httpService.httpOptions)
            .pipe(catchError(this.handleError))
    }

    cadastroClientesCreateOrUpdate(input: CadastroClienteInput): Observable<ApiResponse<ListItem[]>> {
        return this.http.post<ApiResponse<ListItem[]>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiCadastros)}/Cadastros/CadastroClientesCreateOrUpdate`, [input], this.httpService.httpOptions)
            .pipe(catchError(this.handleError))
    }

    enderecoGet(id: number): Observable<ApiResponse<EnderecoView>> {
        const cadastroId = this.vars.cadastro?.id

        return this.http.get<ApiResponse<EnderecoView>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiCadastros)}/Cadastros/EnderecoGet/${cadastroId}/${id}`)
            .pipe(catchError(this.handleError))
    }

    enderecoCreateOrUpdate(input: EnderecoInput): Observable<ApiResponse<number[]>> {
        return this.http.post<ApiResponse<number[]>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiCadastros)}/Cadastros/EnderecoCreateOrUpdate`, [input], this.httpService.httpOptions)
            .pipe(catchError(this.handleError))
    }
}
