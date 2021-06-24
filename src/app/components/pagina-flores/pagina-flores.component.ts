import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Produtos } from '../../models/produtos';
import { ProdutoService } from '../../services/produto.services';
import { TipoProdutoService } from '../../services/tipoProduto.service';
@Component({
  selector: 'app-pagina-flores',
  templateUrl: './pagina-flores.component.html',
  styleUrls: ['./pagina-flores.component.css']
})
export class PaginaFloresComponent implements OnInit {

  environment = "https://localhost:5001/Produto/"
  filtroProduto: any;
  flores: Produtos[];
  filtroId: number;
  produtosId: Array<Number>;

  constructor(private router: Router, private tipoProdutoService: TipoProdutoService, private produtoService: ProdutoService) {
    this.flores = new Array<Produtos>();
    this.filtroId = 0;
    this.produtosId = new Array<Number>();
  }

  ngOnInit(): void {
    this.ObterProdutos();
    this.obterTipoProduto();
    this.obterLocalStorageProdutos();
  }

  ObterProdutos() {
    this.produtoService.buscarProdutos().subscribe(resp => {
      this.flores = resp;
      console.log(resp);
    })
  }

  obterLocalStorageProdutos() {
    let itens = String(localStorage.getItem("ItensCarrinho"));

    if(itens.length > 0)
    {
      JSON.parse(itens).forEach((iten: number) => {
        console.log(itens);
        this.produtosId.push(iten);
        console.log('resp', this.produtosId)
      })
    }
  }


  obterTipoProduto() {
    this.tipoProdutoService.buscarProdutos().subscribe(resp => {
      this.filtroProduto = resp;
      console.log(resp);
    })
  }

  obterProdutosPorTipoID() {
    if (this.filtroId === 0 || String(this.filtroId) === "0") {
      return this.ObterProdutos();
    }
    return this.produtoService.buscarProdutosPorTipoId(this.filtroId).subscribe(resp => {
      if (resp.length < 1) {
        Swal.fire('Não há produtos com esse tipo!', '', 'warning').then(() => this.ObterProdutos());
      }
      this.flores = resp;
      console.log('tipofiltrado', resp);
    })
  }

  inserirProdutoNoCarrinhoLocal(idProduto: number) {
    Swal.fire({
      title: 'Você deseja adicionar ao carrinho??',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Voltar',
      confirmButtonText: 'Adicionar ao Carrinho'
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtosId.push(idProduto);
        console.log(this.produtosId);
        localStorage.setItem('ItensCarrinho', JSON.stringify(this.produtosId));
      }
    }).then(() => Swal.fire('Adicionado ao carrinho!', '', 'success'));

  }
}
