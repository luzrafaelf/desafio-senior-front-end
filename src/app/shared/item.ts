import { UnidadeMedida } from "./unidadeMedida";

export class Item{

    constructor (
        public uuid: String,
        public nome: String,
        public unidadeMedida: UnidadeMedida,
        public quantidade: number,
        public preco: number,
        public perecivel: boolean,
        public dataValidade: Date,
        public dataFabricacao: Date
    ){}

}