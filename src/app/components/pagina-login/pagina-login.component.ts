import { Component, OnInit } from '@angular/core';
import { Cliente, LoginType } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagina-login',
  templateUrl: './pagina-login.component.html',
  styleUrls: ['./pagina-login.component.css']
})
export class PaginaLoginComponent implements OnInit {

  switchMode: boolean;

  GerarCadastro: Cliente;
  Login: LoginType;

  constructor(private router: Router, private clienteService: ClienteService) {
    this.switchMode = false;
    this.GerarCadastro = new Cliente();
    this.Login = new LoginType();
  }

  ngOnInit(): void {
  }

  ChangeMode() {
    this.switchMode = !this.switchMode;
  }

  cadastrarCliente() {
    this.clienteService.inserirCliente(this.GerarCadastro).subscribe(resp => {
      console.log(resp);
      Swal.fire(
        'Cadastrado!',
        '',
        'success'
        )
        this.router.navigate(['login', '/']);
    }, error => {
      Swal.fire(
        'Erro ao Cadastrar!',
        '',
        'error'
      )
    })
  }

  login() {
    this.clienteService.Authentication(this.Login.Email, this.Login.Senha).subscribe(resp => {
      console.log(resp);
      if (resp.length > 0) {
        localStorage.setItem('idCliente', resp[0].id);
        Swal.fire('Logado!', '', 'success').then(() => {
          this.router.navigate(['/', 'meuperfil']).then(x => location.reload());
        });
      } else {
        Swal.fire('Login ou Senha Incorretos!', '', 'error')
        localStorage.removeItem('idCliente');
      }
    })
  }

}
