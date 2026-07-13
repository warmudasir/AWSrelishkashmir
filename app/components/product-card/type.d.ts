export type ProductProps = {
  id: number;
  name: string;
  description: string;
  price?: string;
  imageUrl: string;
  availableQuantity: number;
  quantity: number; // Adding this field for quantity management
}