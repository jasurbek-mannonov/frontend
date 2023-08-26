export interface Category{
    id?: number,
    title: string,
    status: boolean
}

export interface Params{
    id: number,
    title: string,
    category: string,
    status: boolean
}

export interface Product{
    id: number,
    title: string,
    price: number,
    quantity: number,
    category: string,
    params: Params[],
    description?: string,
    createdAt: Date,
    img: string
}

export interface Sale{
    id: number,
    product: string,
    date: Date,
    quantity: number
}