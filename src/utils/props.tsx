export interface CategoryProps {
  id: string;
  name: string;
  description?: string;
}
export interface MoldProps {
  id: string;
  name: string;
}

export interface ProviderProps {
  name: string;
}
export interface ProductProps {
  id: string;
  name: string;
  mold: MoldProps;
  genre: string;
  color: string;
  size: string;
  status: string;
  createdAt: string;
  obs: string;
  sale_value: number;
  purchase_value: number;
  brand: string;
  provider: ProviderProps;
  category: CategoryProps;
}
