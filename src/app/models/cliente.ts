export class Cliente {
    id: number;
    Nome: string;
    Email: string;
    Senha: string;
    Cep: string;
    Cpf: string;
    Endereco: string;
    Numero?: string;
    Complemento?: string;
    Referencia?: string;
    Telefone: string;
    DataNascimento: string;
    Pedidos: [];

    constructor() {
        this.id = 0;
        this.Nome = '';
        this.Email = '';
        this.Senha = '';
        this.Cep = '';
        this.Cpf = '';
        this.Telefone = '';
        this.Endereco = `${this.Referencia} + ${this.Numero} + ${this.Complemento}`;
        this.DataNascimento = '';
        this.Pedidos = [];
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