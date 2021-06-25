import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TipoProduto } from '../../../models/tipoProduto';
import { TipoProdutoService } from '../../../services/tipoProduto.service';

@Component({
  selector: 'modal-personalizacao',
  templateUrl: './modal-personalizacao.component.html',
  styleUrls: ['./modal-personalizacao.component.css']
})
export class ModalPersonalizacaoComponent implements OnInit {

  steps: string;
  ListaTipos: Array<TipoProduto>;
  TiposAdicionados: Array<TipoProduto>;
  produtosId: Array<Number>;
  ListaTiposSemBuque: Array<TipoProduto>;

  constructor(private TipoService: TipoProdutoService, private dialogRef: MatDialogRef<ModalPersonalizacaoComponent>) {
    this.steps = '1';
    this.ListaTipos = new Array<TipoProduto>();
    this.ListaTiposSemBuque = new Array<TipoProduto>();
    this.TiposAdicionados = new Array<TipoProduto>();
    this.produtosId = new Array<Number>();
  }

  ngOnInit(): void {
    this.getTipos();
    this.ObterProdutosLocalStorage();
  }

  closeModal() {
    this.dialogRef.close();
  }

  getTipos() {
    this.TipoService.buscarProdutos().subscribe(resp => {
      this.ListaTipos = resp;
      console.log(resp);
    })
  }

  ObterProdutosLocalStorage() {
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

  AdicionarAoCarrinho() {
    if(this.TiposAdicionados.length > 0)
    {
    let result = this.ListaTipos.filter(x => x.id === 3);
    this.produtosId.push(3);
    localStorage.setItem('ItensCarrinho', JSON.stringify(this.produtosId));
    Swal.fire('Adicionado ao Carrinho!', '', 'success').then(() => {
      this.dialogRef.close();
    })
  } else {
    Swal.fire('Adicione pelo menos um produto no buque', '', 'warning');
  }
  }

  adicionarTipoProduto(type: TipoProduto){
    this.TiposAdicionados.push(type);
  }

  removerTipoProduto(typeid: number){
    this.TiposAdicionados.splice(typeid, 1);
  }

  quantidade(type: string, typeProduct: TipoProduto) {
    switch (type) {
      case 'add':
        typeProduct.quantidade++
        break;
      case 'remove':
        if(typeProduct.quantidade >= 1)
        {
          typeProduct.quantidade--
        }
        break;
      default:
        break;
    }

  }

}
