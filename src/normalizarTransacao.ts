import moedaNumber from "./moedaNumber.js";
import stringToDate from "./stringToDate.js";

declare global {
    type TransacaoPagamento = "Boleto" |  "Cartão de Crédito";
    type TransacaoStatus = "Paga" | "Recusada pela operadora de cartão" | "Aguardando Pagamento" | "Estornada";

interface TransacaoAPI {
    Status: TransacaoStatus;
    ID: number;
    Data: string;
    Nome: string;
    Email: string;
    ['Forma de Pagamento']: TransacaoPagamento;
    ['Valor (R$)']: string; 
    ['Cliente Novo']: number;
}

interface Transacao {
    nome: string;
    id: number;
    data: Date;
    status: TransacaoStatus;
    email: string;
    moeda: string;
    valor: number | null;
    pagamento: TransacaoPagamento;
    novo: boolean;
}
}


export default function normalizarTransação(transacao: TransacaoAPI): Transacao {
    return {
        nome: transacao.Nome,
        id: transacao.ID,
        data: stringToDate(transacao.Data),
        status: transacao.Status,
        email: transacao.Email,
        moeda: transacao["Valor (R$)"],
        valor: moedaNumber(transacao["Valor (R$)"]),
        pagamento: transacao["Forma de Pagamento"],
        novo: Boolean(transacao["Cliente Novo"]),
    }
}