export interface OrderMapped {
  id: number;
  title: string;
  description: string;
  image: string;
  quantity: number;
  price: number;
  totalPrice: number;
  type: string;
  date: string;
}

export interface OrderHistorial{
  id:number;
  title:string;
}