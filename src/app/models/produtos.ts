export class Produtos {
    
    id: number;
    nome: string;
    descricao: string;
    foto: string;
    quantidade: number;
    valor: number;
    tipoProdutosId: Array<Number>;

    constructor() {
        this.id = 0;
        this.nome = '';
        this.descricao = '';
        this.valor = 0;
        this.foto = '';
        this.quantidade = 0;
        this.tipoProdutosId = Array<Number>();
        
    }
    
}