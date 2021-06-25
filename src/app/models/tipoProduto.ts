export class TipoProduto {
    id: number;
    tipo: string;
    quantidade: number;
    valor?: number;
    foto?: string;

    constructor() {
        this.id = 0;
        this.tipo = '';
        this.quantidade = 0;
    }
}