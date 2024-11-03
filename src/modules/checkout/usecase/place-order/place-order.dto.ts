export interface PlaceOrderInputDto {
  clientID: string;
  products: {
    productId: string;
  }[];
}

export interface PlaceOrderOutputDto {
  id: string;
  invoiceID: string;
  status: string;
  total: number;
  products: {
    productId: string;
  }[];
}
