export interface TipoEvento{
    idTipoEvento: string;
    titulo: string;
}

export interface Instituicao{
    IdInstituicao: string;
    cnpj: string;
    nomeFantasia: string;
    endereco: string;
}

export interface Evento{
    idEvento: string;
    nomeEvento: string;
    descricao: string;
    dataEvento: string;
    imagemUrl?: string | null;
    idTipoEvento?: string | null;
    idInstituicao?: string | null;
    idTipoEventoNavigation?: TipoEvento | null;
    idInstituicaoNavigation?: Instituicao | null;
}

