import { Collection } from "../modules/firestore/collection";

export class School extends Collection {

    // Propriedades da entidade.
    static path = "schools"


    name: string
    
    classrooms: string[]

}