import { Observable, Subject, asyncScheduler } from 'rxjs'
import { map, throttleTime } from 'rxjs/operators'
import { firestore } from "firebase/app"
import "firebase/firestore";
import { fromQuerySnapshot, fromDocumentSnapshot, cleanObject } from './utils'

export abstract class Collection {
    /**
     * Path da entidade no firebase
     * @readonly
     */
    public static path?: string
    public get path(): string {
        return (this.constructor as any).path
    }

    /**
     * Chave que é adquirida quando baixado a entidade do firebase.
     * @readonly
     */
    public id?: string

    /**
     * True if the snapshot contains the result of local writes (e.g. set() or
     * update() calls) that have not yet been committed to the backend.
     * If your listener has opted into metadata updates (via
     * `DocumentListenOptions` or `QueryListenOptions`) you will receive another
     * snapshot with `hasPendingWrites` equal to false once the writes have been
     * committed to the backend.
     */
    readonly hasPendingWrites?: boolean;

    /**
     * True if the snapshot was created from cached data rather than
     * guaranteed up-to-date server data. If your listener has opted into
     * metadata updates (via `DocumentListenOptions` or `QueryListenOptions`)
     * you will receive another snapshot with `fromCache` equal to false once
     * the client has received up-to-date data from the backend.
     */
    readonly fromCache?: boolean;

    /**
     * Default constructor que pega todas informações e coloca como atributos
     * @param info 
     */
    constructor(info: any) {
        Object.assign(this, info)
    }

    /**
     * Referência para o collection de acordo com o firestore
     */
    public static get collection(): firestore.CollectionReference {
        if (!this.path) throw Error("Collection inicializada sem path")
        return firestore().collection(this.path)
    }

    /**
     * Referência para o collection de acordo com o firestore
     */
    public get collection(): firestore.CollectionReference {
        if (!this.path) throw Error("Collection inicializada sem path")
        return firestore().collection(this.path)
    }

    /**
     * Listagem de todos os itens em tempo real
     * @param where Array de condições que serão utilizados na consulta
     * @param order Define como será a ordenação dos elementos consultados
     * @param limit Define o número máximo de elementos retornados
     */
    public static async list<T>(where?: WhereQuery[], order?: OrderQuery[], limit?: number): Promise<T[]> {
        const query: firestore.Query = this.prepare_query(this.collection, where, order, limit)

        const data = await query.get()
        return fromQuerySnapshot(data).map((item: T) => new (this as any)(item))
    }

    /**
     * Listagem de todos os itens em tempo real
     * @param where Array de condições que serão utilizados na consulta
     * @param order Define como será a ordenação dos elementos consultados
     * @param limit Define o número máximo de elementos retornados
     */
    public static realtime<T>(where?: WhereQuery[], order?: OrderQuery[], limit?: number): Observable<T[]> {
        const query: firestore.Query = this.prepare_query(this.collection, where, order, limit)
        const obs: Subject<any> = new Subject()
        query.onSnapshot({ includeMetadataChanges: true }, obs)
        return obs
            .pipe(throttleTime(1000, asyncScheduler, { leading: true, trailing: true }))
            .pipe(map(fromQuerySnapshot))
            .pipe(map((itens: T[]) => {
                return itens.map((item: T) => new (this as any)(item))
            }))
    }

    /**
     * @param where Array de condições que serão utilizados na consulta
     * @param order Define como será a ordenação dos elementos consultados
     * @param limit Define o número máximo de elementos retornados
     */
    private static prepare_query<T>(collection: firestore.CollectionReference, where?: WhereQuery[], order?: OrderQuery[], limit?: number): firestore.Query {
        let query: firestore.Query = collection
        if (where) {
            for (let i = 0; i < where.length; i++) {
                query = query.where(where[i].name, where[i].operator, where[i].value)
            }
        }

        if (order) {
            for (let i = 0; i < order.length; i++) {
                if (order[i].type) query = query.orderBy(order[i].name, order[i].type)
                else query = query.orderBy(order[i].name)
            }
        }

        if (limit) {
            query = query.limit(limit)
        }
        return query
    }

    /**
     * Adicionar um novo elemento
     */
    public async add(): Promise<void> {
        const document = await this.collection.add(cleanObject(this, ['id', 'hasPendingWrites', 'fromCache']))
        Object.assign(this, {
            id: document.id
        })
    }

    /**
     * Update destrutivo(remove todo o objeto que existia antes e atribui ao novo)
     */
    public async set(): Promise<void> {
        return this.collection.doc(this.id).set(cleanObject(this, ['id', 'hasPendingWrites', 'fromCache']))
    }

    /**
     * Se não possuir ID cria um novo objeto
     * Se possuir um ID faz um update destrutivo
     */
    public async save(): Promise<void> {
        if (this.id) return this.set()
        else return this.add()
    }

    /**
     * Remover objeto do database
     */
    public async remove(): Promise<any> {
        return this.collection.doc(this.id).delete()
    }
    public async delete(): Promise<any> {
        return this.remove()
    }

    /**
     * Faz o merge entre os objetos dando prioridade ao objeto novo.
     * @param obj novo objeto
     */
    public async update<T>(obj: T): Promise<void> {
        return this.collection.doc(this.id).update(cleanObject(obj, ['id', 'hasPendingWrites', 'fromCache']))
    }

    /**
     * Obter um objeto do database
     * @param id id do objeto
     */
    public static async object<T>(id: string): Promise<T> {
        const data = await this.collection.doc(id).get()
        return new (this as any)(fromDocumentSnapshot(data))
    }

    /**
     * Obter um objeto do database
     * @param id id do objeto
     */
    public static object_sync<T>(id: string): Observable<T> {
        const obs: Subject<any> = new Subject()
        this.collection.doc(id).onSnapshot({ includeMetadataChanges: true }, obs)
        return obs
            .pipe(throttleTime(1000, asyncScheduler, { leading: true, trailing: true }))
            .pipe(map(fromDocumentSnapshot))
            .pipe(map((item) => new (this as any)(item)))
    }

}

/**
 * Define uma configuração de consulta que deve ser atendida.
 */
export interface WhereQuery {
    /**
     * Nome do atributo que será comparado
     */
    name: string

    /**
     * Operador de comparação
     */
    operator: "<" | "<=" | "==" | ">" | ">=",

    /**
     * Valor que será usado para comparar na consulta
     */
    value: any
}

/**
 * Estrutura que define uma ordenação
 */
export interface OrderQuery {
    /**
     * Nome do atributo
     */
    name: string

    /**
     * Se não for mandado esse atributo, o padrão é crescente
     * asc - crescente
     * desc - decrescente
     */
    type?: "asc" | "desc"
}