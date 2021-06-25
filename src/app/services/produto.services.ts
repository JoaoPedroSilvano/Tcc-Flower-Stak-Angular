import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produtos } from '../models/produtos';


@Injectable({
  providedIn: 'root',
})
export class ProdutoService {

  corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8888/'
  });
  
  environment = 'https://localhost:5001/Produto/'
  
  constructor(private http: HttpClient) { }
  /* GET ------------------------------------------------------*/
  buscarProdutos(): Observable<any> {
    const endpoint = 'BuscarProdutos';
    return this.http.get<any>(this.environment + endpoint);
  }
  buscarProdutosPorId(id: number): Observable<any> {
    const endpoint = `BuscarProdutosPorId/${id}`;
    return this.http.get<any>(this.environment + endpoint);
  }

  buscarProdutosPorTipoId(tipoId: number): Observable<any> {
    const endpoint = `BuscarProdutosPorTipo?tipoId=${tipoId}`;
    return this.http.get<any>(this.environment + endpoint);
  }

  /* POST ------------------------------------------------------*/
  inserirProduto(produto: Produtos): Observable<any> {
    const endpoint = 'CadastrarProduto';
    return this.http.post<any>(this.environment + endpoint, produto);
  }
  /* PUT ------------------------------------------------------*/
  atualizarProduto(produto: Produtos): Observable<any> {
    const endpoint = 'AtualizarProduto';
    return this.http.put<any>(this.environment + endpoint, produto);
  }
  /* DELETE ------------------------------------------------------*/
  deletarProduto(id: number): Observable<any> {
    const endpoint = 'DeletarProduto/';
    return this.http.delete<any>(this.environment + endpoint + id);
  }
}
