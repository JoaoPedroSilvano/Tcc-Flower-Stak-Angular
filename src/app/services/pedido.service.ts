import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoProduto } from '../models/tipoProduto';
import { Pedidos } from '../models/pedidos';


@Injectable({
  providedIn: 'root',
})
export class PedidoService {

  environment = 'https://localhost:5001/Pedido/'
  
  constructor(private http: HttpClient) { }
  /* GET ------------------------------------------------------*/
  buscarPedidos(): Observable<any> {
    const endpoint = 'BuscarPedidos';
    return this.http.get<any>(this.environment + endpoint);
  }
  buscarPedidosPorIdCliente(id: number): Observable<any> {
    const endpoint = `BuscarPedidoPorId/${id}`;
    return this.http.get<any>(this.environment + endpoint);
  }
  /* POST ------------------------------------------------------*/
  inserirProduto(pedido: Pedidos): Observable<any> {
    const endpoint = 'CadastrarPedido';
    return this.http.post<any>(this.environment + endpoint, pedido);
  }
  /* PUT ------------------------------------------------------*/
  atualizarProduto(pedido: Pedidos): Observable<any> {
    const endpoint = 'AtualizarPedido';
    return this.http.put<any>(this.environment + endpoint, pedido);
  }
  /* DELETE ------------------------------------------------------*/
  deletarProduto(id: number): Observable<any> {
    const endpoint = 'DeletarPedido/';
    return this.http.delete<any>(this.environment + endpoint + id);
  }
}
