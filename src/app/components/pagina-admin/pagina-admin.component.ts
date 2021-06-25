import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Pedidos } from '../../models/pedidos';
import { Produtos } from '../../models/produtos';
import { TipoProduto } from '../../models/tipoProduto';
import { ClienteService } from '../../services/cliente.services';
import { PedidoService } from '../../services/pedido.service';
import { ProdutoService } from '../../services/produto.services';
import { TipoProdutoService } from '../../services/tipoProduto.service';

@Component({
  selector: 'app-pagina-admin',
  templateUrl: './pagina-admin.component.html',
  styleUrls: ['./pagina-admin.component.css']
})
export class PaginaAdminComponent implements OnInit {

  GerarProduto: Produtos;
  GerarTipoProduto: TipoProduto;
  ListaTipos: Array<TipoProduto>;
  MudarInputs: string;
  ListaPedidos: Array<Pedidos>;
  idPedido: number;

  constructor(private pedidoService: PedidoService, private produtoService: ProdutoService, private tipoprodutoService: TipoProdutoService, private clienteService: ClienteService) {
    this.GerarProduto = new Produtos();
    this.GerarTipoProduto = new TipoProduto();
    this.ListaTipos = new Array<TipoProduto>();
    this.MudarInputs = '';
    this.ListaPedidos = new Array<Pedidos>();
    this.idPedido = 0;
  }

  ngOnInit(): void {
    this.buscarTipos();
    this.buscarPedidos();
  }

  onGetImage(type: string, inputValue: any) {
    let file = inputValue.target.files[0];
    let reader = new FileReader();
    let timerInterval: any;
    switch (type) {
      case 'produto':
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.GerarProduto.foto = String(reader.result);
          Swal.fire({
            title: 'Carregando a imagem',
            html: 'Tempo para terminar <b></b> milliseconds.',
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getHtmlContainer()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = String(Swal.getTimerLeft())
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
        };
        console.log(this.GerarProduto.foto);
        reader.onerror = function (error) {
          Swal.fire('Erro ao salvar imagem, tente novamente', '', 'warning')
        };
        break;

      case 'tipoproduto':
        reader.readAsDataURL(file);
        reader.onload = () => {
          console.log(String(reader.result))
          this.GerarTipoProduto.foto = String(reader.result);
          Swal.fire({
            title: 'Carregando a imagem',
            html: 'Tempo para terminar <b></b> milliseconds.',
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getHtmlContainer()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = String(Swal.getTimerLeft())
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
        };
        console.log(this.GerarTipoProduto.foto);
        reader.onerror = function (error) {
          Swal.fire('Erro ao salvar imagem, tente novamente', '', 'warning')
        };
        break;

      default:
        break;
    }
  }

  cadastroProduto() {
    if(this.GerarProduto.nome.length <= 0){
      return Swal.fire('Erro ao adicionar produto', '', 'warning');
    }
    if(this.GerarProduto.descricao.length <= 0){
      return Swal.fire('Erro ao adicionar produto', '', 'warning');
    }
    if(this.GerarProduto.valor <= 0){
      return Swal.fire('Erro ao adicionar produto', '', 'warning');
    }
    if(this.GerarProduto.foto.length <= 0){
      return Swal.fire('Erro ao adicionar produto', '', 'warning');
    }
    console.log('produtogerado', this.GerarProduto);
    return this.produtoService.inserirProduto(this.GerarProduto).subscribe(resp => {
      console.log('respostaCadastroTipoProduto', resp);
      Swal.fire('Produto Inserido', '', 'success').then(() => {
        this.GerarProduto = new Produtos();
      });
    }, error => {
      Swal.fire('Erro ao Inserir Produto', '', 'warning');
    })
  }

  buscarPedidos() {
    this.pedidoService.buscarPedidos().subscribe(resp => {
      this.ListaPedidos = resp;
      console.log(resp);
    })
  }

  CadastroTipoProduto() {
    if(this.GerarTipoProduto.tipo.length <= 0){
      return Swal.fire('Erro ao adicionar tipo produto', '', 'warning');
    }
    if(this.GerarTipoProduto.valor === 0){
      return Swal.fire('Erro ao adicionar tipo produto', '', 'warning');
    }
    if(this.GerarTipoProduto.foto == ''){
      return Swal.fire('Erro ao adicionar tipo produto', '', 'warning');
    }
    return this.tipoprodutoService.inserirProduto(this.GerarTipoProduto).subscribe(resp => {
      console.log('respostaCadastroTipoProduto', resp);
      this.buscarTipos();
      Swal.fire('Tipo Produto Inserido', '', 'success').then(() => {
        this.GerarTipoProduto = new TipoProduto();
      });;
    }, error => {
      Swal.fire('Erro ao Inserir Tipo Produto', '', 'warning');
    })
  }

  GetTipoProdutoId(typeid: number) {
    this.GerarProduto.tipoProdutosId.push(typeid);
    console.log('GerarProdutoTipo', this.GerarProduto)
  }

  buscarTipos() {
    this.tipoprodutoService.buscarProdutos().subscribe(resp => {
      this.ListaTipos = resp;
    })
  }

}
