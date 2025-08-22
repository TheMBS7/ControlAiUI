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