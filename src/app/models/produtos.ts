export class Produtos {
    
    id: number;
    nome: string;
    descricao: string;
    foto: string;
    quantidade: string;
    valor: number;
    idTipoProduto: number;
    idTipoProdutoNavigation: null;

    constructor() {
        this.id = 0;
        this.nome = '';
        this.descricao = '';
        this.valor = 0;
        this.foto = '';
        this.quantidade = '';
        this.idTipoProduto = 0;
        this.idTipoProdutoNavigation = null;
        
    }
    
}