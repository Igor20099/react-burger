

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v?: number;
    productId:string
    count?: number
}

export type TOrder = {
    ingredients: Array<string>
    _id: string
    status: string
    number: number
    price: number
    createdAt: Date
    updatedAt: Date
    name: string
    owner?: {
        createdAt: Date
        updatedAt: Date
        email: string
        name: string
    }
    __v: number
}
