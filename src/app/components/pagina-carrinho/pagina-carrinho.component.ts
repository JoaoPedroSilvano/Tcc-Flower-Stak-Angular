import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { bigModal, mediumModal } from '../../../utils/modal-size';
import { ModalFecharCompraComponent } from '../models/modal-fecharcompra/modal-fecharcompra.component';
import { ModalPersonalizacaoComponent } from '../models/modal-personalizacao/modal-personalizacao.component';

@Component({
  selector: 'app-pagina-carrinho',
  templateUrl: './pagina-carrinho.component.html',
  styleUrls: ['./pagina-carrinho.component.css']
})
export class PaginaCarrinhoComponent implements OnInit {

  setLogin: boolean;

  constructor(private Router: Router ,private dialog: MatDialog) { 
    this.setLogin = false;
  }

  ngOnInit(): void {
    this.setLogin = localStorage.getItem('idCliente') ? true : false
  }

  openDialog() {
    if(this.setLogin == false)
    {
      return Swal.fire('Logue-se para terminar a compra', '' , 'info').then(() => {
        this.Router.navigate(['/', 'login']);
      })
    }
    return this.dialog.open(ModalFecharCompraComponent, {
      ...bigModal
    });
  }

}