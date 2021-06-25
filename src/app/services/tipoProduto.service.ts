import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produtos } from '../models/produtos';
import { TipoProduto } from '../models/tipoProduto';


@Injectable({
  providedIn: 'root',
})
export class TipoProdutoService {

  environment = 'https://localhost:5001/TipoProduto/'
  
  constructor(private http: HttpClient) { }
  /* GET ------------------------------------------------------*/
  buscarProdutos(): Observable<any> {
    const endpoint = 'BuscarTiposProdutos';
    return this.http.get<any>(this.environment + endpoint);
  }
  BuscarTiposProdutosSemBuque(): Observable<any> {
    const endpoint = 'BuscarTiposProdutosSemBuque';
    return this.http.get<any>(this.environment + endpoint);
  }
  buscarProdutosPorId(id: number): Observable<any> {
    const endpoint = `BuscarTiposProduto/${id}`;
    return this.http.get<any>(this.environment + endpoint);
  }
  /* POST ------------------------------------------------------*/
  inserirProduto(tipoProduto: TipoProduto): Observable<any> {
    const endpoint = 'CadastrarTipoProduto';
    return this.http.post<any>(this.environment + endpoint, tipoProduto);
  }
  /* PUT ------------------------------------------------------*/
  atualizarProduto(tipoProduto: TipoProduto): Observable<any> {
    const endpoint = 'AtualizarTipoProduto';
    return this.http.put<any>(this.environment + endpoint, tipoProduto);
  }
  /* DELETE ------------------------------------------------------*/
  deletarProduto(id: number): Observable<any> {
    const endpoint = 'DeletarTipoProduto/';
    return this.http.delete<any>(this.environment + endpoint + id);
  }
}
