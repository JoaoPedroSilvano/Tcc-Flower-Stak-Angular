import { ItensPedidos } from "./itensPedidos";

export class Pedidos {
    id?: number;
    activeToggle?: boolean;
    descricao?: string;
    ProdutosId?: Array<Number>;
    dataPedido?: string;
    endereco?: string;
    valorFrete?: string;
    valorPagar: number;
    valorTotalComFrete?: string;
    metodoPagamento?: string;
    valorTotal?: string;
    idCliente?: number;

    constructor() {
        this.activeToggle = false;
        this.descricao = '';
        this.dataPedido = '';
        this.valorFrete = '';
        this.valorPagar = 0;
        this.valorTotalComFrete = '';
        this.metodoPagamento = '';
        this.ProdutosId = new Array<Number>();
        this.valorTotal = '';
    }
}