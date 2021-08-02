import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private APIurl = "https://www.getwayautomacao.com.br/teste-angular/api/produtos";

  constructor(private httpClient: HttpClient) { }

  public buscarProdutos() {
    return this.httpClient.post(`${this.APIurl}/buscarProdutos`, {
      "paginacao": {
        "paginaAtual": 1,
        "itensPorPagina": 30
      }
    });
  }
}
