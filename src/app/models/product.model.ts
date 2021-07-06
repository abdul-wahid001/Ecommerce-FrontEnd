export interface Product {
  category: string;
  id: number;
  image:string,
  title: string,
  price: number,
  quantity: number,
  description: string,
  images:string[]
}

export interface ServerAllProductsResponse {
  count : number;
  data: Product[];
  success: boolean;
  pagination: {
    next: {
      page: number,
      limit: number
    },
    prev: {
      page: number,
      limit: number
    }
  }
}

export interface ServerSingleProductsResponse {
  data: Product;
  success: boolean;
}
