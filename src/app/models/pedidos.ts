import { ItensPedidos } from "./itensPedidos";

export class Pedidos {
    activeToggle?: boolean;
    descricao?: string;
    ProdutosId?: Array<Number>;
    dataPedido?: string;
    valorFrete?: string;
    valorPagar?: number;
    valorTotalComFrete?: string;
    metodoPagamento?: string;
    valorTotal?: string;

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