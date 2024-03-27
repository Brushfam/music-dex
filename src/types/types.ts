export type trackDataType = {
    rights_holder: string,
    price: number,
    details: {type: string, value: string}[],
    description?: string,
}

export type trackOwnerType = {
    address: string,
    track: string,
    tokenAddress: string
}
