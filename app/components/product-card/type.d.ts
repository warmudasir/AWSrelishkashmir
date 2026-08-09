export type ProductProps = {
  id: number;
  name: string;
  description: string;
  price?: number | string;
  imageUrl: string;
  availableQuantity: number;
  quantity: number;
}