import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Cliente } from '../../../models/cliente';
import { Pedidos } from '../../../models/pedidos';
import { ClienteService } from '../../../services/cliente.services';
import { PedidoService } from '../../../services/pedido.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'modal-fecharcompra',
  templateUrl: './modal-fecharcompra.component.html',
  styleUrls: ['./modal-fecharcompra.component.css']
})
export class ModalFecharCompraComponent implements OnInit {
 

  steps: string;
  gerarPedido: Pedidos;
  perfil: Cliente;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private clienteService: ClienteService, private pedidoService: PedidoService, private dialogRef: MatDialogRef<ModalFecharCompraComponent>) {
    this.steps = '1';
    this.gerarPedido = new Pedidos();
    this.perfil = new Cliente();
  }

  ngOnInit(): void {
    this.getPerfil();
    console.log('data', this.data)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.gerarPedido);
  }

  closeModal() {
    this.dialogRef.close();
  }

  getPerfil() {
    this.clienteService.BuscarClientePorId(Number(localStorage.getItem('idCliente'))).subscribe(resp => {
      this.perfil = resp[0];
    })
  }

  atualizarMetodoPagamento(type: string) {
    switch (type) {
      case 'cartao':
        this.gerarPedido.metodoPagamento = "Cartão de Crédito/Débito"
        break;
      case 'dinheiro':
        this.gerarPedido.metodoPagamento = "Dinheiro"
        break;
      default:
        break;
    }
  }

  finalizarPedido() {
    this.gerarPedido.ProdutosId = JSON.parse(String(localStorage.getItem("ItensCarrinho")));
    this.gerarPedido.valorTotal = String(this.data);
    this.gerarPedido.valorFrete = '20';
    console.log(this.gerarPedido);
    Swal.fire({
      title: 'Você deseja finalizar o pedido?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Voltar',
      confirmButtonText: 'Adicionar ao Carrinho'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoService.inserirProduto(this.gerarPedido).subscribe(resp => {
          this.gerarPedido.descricao = resp.descricao;
          console.log(resp)
          this.steps = '3'
          localStorage.removeItem('ItensCarrinho');
        }, error => {
          Swal.fire('Erro ao Finalizar Pedido!', '', 'warning');
        });
      }
    });
  }
}
