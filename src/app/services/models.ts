interface EntradaFixa {
    id: number;
    descricao: string;
    valor: number;
    dataReferencia: Date;
}

interface SaidaFixa {
    id: number;
    descricao: string;
    valor: number;
    dataVencimento: Date;
    categoriaId: number;
}

interface Categoria {
    id: number;
    nome: string;
}

interface Extrato {
    id: number;
    descricao: string;
    valorTotal: number;
    data: Date;
    numeroMaxParcelas: number;
    numeroParcela: number;
    categoriaId: number;
    pessoaId: number;
    mesId: number;
    
}

interface Pessoa {
    id: number;
    nome: string;
}
