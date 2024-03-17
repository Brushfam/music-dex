export type trackDataType = {
    rights_holder: string,
    price: number,
    details: {type: string, value: string}[],
    description?: string,
}

export type TPurchaseArgs = {
    amount: number;
    productName: string;
    productPrice: number;
    productCount: number;
}
