export interface Data {
  axiosClient: string
  method: string
  url: string
  moreConfigs: string
}

export interface User {
  id: number
  name: string
  email: string
}

export interface Product {
  id: number
  name: string
  price: number
}

export interface NFes {
  id: number
  chaveAcesso: string
  emitente: {
    cnpj: string
    nome: string
    endereco: {
      logradouro: string
      numero: string
      bairro: string
      municipio: string
      uf: string
      cep: string
    }
  }
  destinatario: {
    cnpj: string
    nome: string
    endereco: {
      logradouro: string
      numero: string
      bairro: string
      municipio: string
      uf: string
      cep: string
    }
  }
  dataEmissao: string
  valorTotal: number
  impostos: {
    icms: number
    ipi: number
    pis: number
    cofins: number
  }
  produtos: {
    descricao: string
    codigo: string
    ncm: string
    quantidade: number
    valorUnitario: number
    valorTotal: number
  }[]
  numeroNFe: string
  status: string
}
