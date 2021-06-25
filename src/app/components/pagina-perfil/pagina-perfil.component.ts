import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../../models/cliente';
import { Pedidos } from '../../models/pedidos';
import { ClienteService } from '../../services/cliente.services';

@Component({
  selector: 'app-pagina-perfil',
  templateUrl: './pagina-perfil.component.html',
  styleUrls: ['./pagina-perfil.component.css']
})
export class PaginaPerfilComponent implements OnInit {

  changeForm: string;
  produtos: Array<Pedidos>;
  perfil: Cliente;
  alterarSenha: ChangePasswordType;
  // separatorEndereco = [numero, complemento, referencia];

  constructor(private router: Router ,private clienteService: ClienteService) {
    this.changeForm = 'DadosPessoais'
    this.produtos = new Array<Pedidos>();
    this.perfil = new Cliente();
    this.alterarSenha = new ChangePasswordType();
  }

  ngOnInit(): void {
    this.setValuesProdutos();
    localStorage.getItem('idCliente') ? this.getPerfil() : null;
  }

  setValuesProdutos() {
    this.produtos = [
      {
        activeToggle: true,
        metodoPagamento: 'credito',
        dataPedido: '20/07/2021',
        descricao: '0001',
        valorPagar: 20,
        // produtos: [
        //   {
        //     nomeProduto: 'Rosa',
        //     valorUnitProduto: 'R$ 200',
        //     quantidadeProduto: '3',
        //     valorTotal: 'R$ 300',
        //   },
        //   {
        //     nomeProduto: 'Margarida',
        //     valorUnitProduto: 'R$ 200',
        //     quantidadeProduto: '3',
        //     valorTotal: 'R$ 300',
        //   },
        //   {
        //     nomeProduto: 'Dente-de-Leão',
        //     valorUnitProduto: 'R$ 200',
        //     quantidadeProduto: '3',
        //     valorTotal: 'R$ 300',
        //   },
        // ],
        valorTotal: 'R$ 30,00',
        valorFrete: 'R$ 30,00',
        valorTotalComFrete: 'R$ 37,00',
      }
    ]
  }

  switchForm(value: string) {
    switch (value) {
      case 'DadosPessoais':
        this.changeForm = 'DadosPessoais'
        break;
      case 'Pedidos':
        this.changeForm = 'Pedidos'
        break;
      case 'AlterarSenha':
        this.changeForm = 'AlterarSenha'
        break;

      default:
        break;
    }
  }

  getPerfil() {
    this.clienteService.BuscarClientePorId(Number(localStorage.getItem('idCliente'))).subscribe(resp => {
      console.log('resp', resp[0])
      this.perfil = resp[0];
      console.log(this.perfil);
    }, error => {
      localStorage.removeItem('idCliente');
      localStorage.removeItem('Funcao')
      location.reload();
    })
  }

  sair() {
    localStorage.removeItem('idCliente')
    localStorage.removeItem('Funcao')
    this.router.navigate(['/', 'login']).then(() => location.reload())
  }

  atualizarPerfil() {
    console.log('periflatualizar', this.perfil)
    if(String(this.alterarSenha.senhaAntiga) !== String(this.perfil.senha))
    {
      console.log('senhantiga', this.alterarSenha.senhaAntiga);
      console.log('perfilsenha', this.perfil.senha)
      return Swal.fire('Senha antiga errada!', '' , 'warning')
    } 
    if(this.alterarSenha.senhaNova !== this.alterarSenha.confirmarNovaSenha)
    {
      return Swal.fire('As novas senhas são diferentes!', '', 'warning')
    }
    this.perfil.senha = this.alterarSenha.senhaNova;
    let perfil = this.perfil;
    return this.clienteService.atualizarCliente(perfil).subscribe(resp => {
      Swal.fire('Senha Atualizada', '', 'success');
    }, error => {
      Swal.fire('Erro ao Atualizar Senha', '', 'error')
    })
  }
}

export class ChangePasswordType {
    senhaAntiga: string;
    senhaNova: string;
    confirmarNovaSenha: string;

    constructor() {
      this.senhaAntiga = '';
      this.senhaNova = '';
      this.confirmarNovaSenha = '';
    }
}