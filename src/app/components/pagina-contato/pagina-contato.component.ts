import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ClienteService } from '../../services/cliente.services';

@Component({
  selector: 'app-pagina-contato',
  templateUrl: './pagina-contato.component.html',
  styleUrls: ['./pagina-contato.component.css']
})
export class PaginaContatoComponent implements OnInit {

  GerarEnvioEmail: EnvioEmailType;

  constructor(private clienteService: ClienteService) {
    this.GerarEnvioEmail = new EnvioEmailType();
  }

  ngOnInit(): void {
  }

  enviarEmail() {
    this.clienteService.EnviarEmail(this.GerarEnvioEmail.nome, this.GerarEnvioEmail.telefone, this.GerarEnvioEmail.email, this.GerarEnvioEmail.assunto).subscribe(resp => {
      console.log(resp);
      // if(resp)

    }, error => {
      console.log(error.status);
      if (error.status === 200) {
        Swal.fire('Email enviado com sucesso!', '', 'success')
      } else {

        Swal.fire('Erro ao Contatar a flowerStak', '', 'error');
      }
    })
  }

}

export class EnvioEmailType {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;

  constructor() {
    this.nome = '';
    this.email = '';
    this.telefone = '';
    this.assunto = '';
  }
}
