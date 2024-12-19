export type CartType = {
  items: {
      product: {
        id: string,
        name: string,
        url: string,
        image: string,
        price: number
      },
      quantity: number
    }[]
}
