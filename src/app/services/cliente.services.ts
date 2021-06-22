import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produtos } from '../models/produtos';
import { Cliente } from '../models/cliente';


@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  environment = 'https://localhost:5001/Cliente/'
  
  constructor(private http: HttpClient) { }
  /* GET ------------------------------------------------------*/
  buscarClientes(): Observable<any> {
    const endpoint = 'BuscarClientes';
    return this.http.get<any>(this.environment + endpoint);
  }
  BuscarClientePorId(id: number): Observable<any> {
    const endpoint = `BuscarClientePorId/${id}`;
    return this.http.get<any>(this.environment + endpoint);
  }
  
  Authentication(login: string, senha: string): Observable<any> {
    const endpoint = `Authentication?login=${login}&senha=${senha}`;
    return this.http.get<any>(this.environment + endpoint);
  }
  /* POST ------------------------------------------------------*/
  inserirCliente(cliente: Cliente): Observable<any> {
    const endpoint = 'CadastrarCliente';
    return this.http.post<any>(this.environment + endpoint, cliente);
  }
  /* PUT ------------------------------------------------------*/
  atualizarCliente(cliente: Cliente): Observable<any> {
    const endpoint = 'AtualizarCliente';
    return this.http.put<any>(this.environment + endpoint, cliente);
  }
  /* DELETE ------------------------------------------------------*/
  deletarCliente(id: number): Observable<any> {
    const endpoint = 'DeletarCliente/';
    return this.http.delete<any>(this.environment + endpoint + id);
  }
}
