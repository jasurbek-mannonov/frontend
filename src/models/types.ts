export interface Category{
    id?: number,
    title: string,
    status: boolean
}

export interface Params{
    id: number,
    title: string,
    category: number | '',
    status: boolean
}

export interface ProductParam{
    id: number,
    title: string,
    value: string
}

export interface Product{
    id?: number,
    title: string,
    price: number,
    quantity: number,
    category: number | null,
    params: ProductParam[],
    description?: string,
    createdAt: Date,
    img: string,
    status: boolean
}

export interface Sale{
    id?: number,
    product: number | undefined,
    date: Date,
    quantity: number,
    info: Product,
    value: any
}