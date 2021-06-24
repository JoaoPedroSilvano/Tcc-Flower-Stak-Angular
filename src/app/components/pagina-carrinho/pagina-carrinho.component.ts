import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { bigModal, mediumModal } from '../../../utils/modal-size';
import { Produtos } from '../../models/produtos';
import { ProdutoService } from '../../services/produto.services';
import { ModalFecharCompraComponent } from '../models/modal-fecharcompra/modal-fecharcompra.component';
import { ModalPersonalizacaoComponent } from '../models/modal-personalizacao/modal-personalizacao.component';

@Component({
  selector: 'app-pagina-carrinho',
  templateUrl: './pagina-carrinho.component.html',
  styleUrls: ['./pagina-carrinho.component.css']
})
export class PaginaCarrinhoComponent implements OnInit {

  setLogin: boolean;
  ProdutosNoCarrinho: Array<Produtos>;
  valorTotal: number;

  constructor(private produtoService: ProdutoService, private Router: Router, private dialog: MatDialog) {
    this.setLogin = false;
    this.ProdutosNoCarrinho = new Array<Produtos>();
    this.valorTotal = 0;
  }

  ngOnInit(): void {
    this.setLogin = localStorage.getItem('idCliente') ? true : false
    this.obterItensCarrinhoArray();
  }

  openDialog() {
    if(this.ProdutosNoCarrinho.length <= 0)
    {
      return Swal.fire('Adicione um produto no carrinho para terminar a compra!!', '', 'info');
    }
    if(this.setLogin == false) {
      return Swal.fire('Logue-se para terminar a compra', '', 'info').then(() => {
        this.Router.navigate(['/', 'login']);
      })
    }
    return this.dialog.open(ModalFecharCompraComponent, {
      ...bigModal,
      data: this.valorTotal
    });
  }

  queryProdutos() {
    if (this.ProdutosNoCarrinho.length <= 0) {
      Swal.fire('Não há produtos no carrinho!', '', 'warning').then(() => {
        this.Router.navigate(['/', 'flores']);
      })
    }
  }

  Quantity(type: string, produto: Produtos) {
    if(type === 'add'){
      produto.quantidade === 999 ? produto.quantidade : produto.quantidade++
    } else if (type === 'remove') {
      produto.quantidade === 0 ? produto.quantidade : produto.quantidade--
    }
  }

  obterItensCarrinhoArray() {
    let valorTotal: number = 0;
    let itens = String(localStorage.getItem("ItensCarrinho"));
    JSON.parse(itens)?.forEach((itens: number) => {
      console.log(itens);
      this.produtoService.buscarProdutosPorId(itens).subscribe(resp => {
        this.ProdutosNoCarrinho.push(resp[0]);
        valorTotal += Number(resp[0].valor);
        console.log('resp', Number(resp[0].valor))
      })
    })
    console.log('produtosnocarrinho', this.ProdutosNoCarrinho);
    this.valorTotal = valorTotal;
  }

  removerItem(id: any) {
    this.ProdutosNoCarrinho.splice(this.ProdutosNoCarrinho.indexOf(id), id);
  }

}