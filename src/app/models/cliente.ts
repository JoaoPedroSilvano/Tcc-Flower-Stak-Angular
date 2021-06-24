export class Cliente {
    id: number;
    nome: string;
    email: string;
    senha: string;
    cep: string;
    cpf: string;
    endereco: string;
    numero?: string;
    complemento?: string;
    referencia?: string;
    telefone: string;
    dataNascimento: string;
    pedidos: [];

    constructor() {
        this.id = 0;
        this.nome = '';
        this.email = '';
        this.senha = '';
        this.cep = '';
        this.cpf = '';
        this.telefone = '';
        this.endereco = '';
        this.dataNascimento = '';
        this.pedidos = [];
    }
    
}

export class LoginType {

    Email: string;
    Senha: string;

    constructor() {
        this.Email = '';
        this.Senha = '';
    }
}