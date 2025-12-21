import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ViaCepResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    erro?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class ViaCepService {
    private readonly API = 'https://viacep.com.br/ws';

    constructor(private http: HttpClient) {}

    getAddress(cep: string): Observable<ViaCepResponse> {
        return this.http.get<ViaCepResponse>(`${this.API}/${cep}/json`);
    }
}
