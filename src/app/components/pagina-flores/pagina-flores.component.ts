import { Component, OnInit } from '@angular/core';
import { Produtos } from '../../models/produtos';
import { ProdutoService } from '../../services/produto.services';
@Component({
  selector: 'app-pagina-flores',
  templateUrl: './pagina-flores.component.html',
  styleUrls: ['./pagina-flores.component.css']
})
export class PaginaFloresComponent implements OnInit {

  environment = "https://localhost:5001/Produto/"

  flores: Produtos[];

  constructor(private produtoService: ProdutoService) {
    this.flores = new Array<Produtos>();
  }

  ngOnInit(): void {
    this.ObterProdutos();
  }

  ObterProdutos() {
    this.produtoService.buscarProdutos().subscribe(resp => {
      this.flores = resp;
      console.log(resp);
    })
  }
}
