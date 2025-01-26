import { Ingrediente } from "./IIngredientes"

export interface IReceta {
    id?: number
    titulo: string
    descripcion?: string
    instrucciones?: string
    id_usuario: number
    id_categoria?: number
    ingredientes: Ingrediente[]
}