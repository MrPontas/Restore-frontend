export interface CategoryProps {
  id: string;
  name: string;
  description?: string;
}
export interface MoldProps {
  id: string;
  name: string;
}

export interface UserProps {
  id: string;
  name: string;
  administrator: boolean;
  login?: string;
  password?: string;
}
export interface ProviderProps {
  id: string;
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
  purchase_type: string;
  sale_value: number;
  purchase_value: number;
  brand: string;
  provider: ProviderProps;
  category: CategoryProps;
  user: UserProps;
}

export interface RegisterProps {
  id: string;
  type: string;
  user: UserProps;
  created_at: string;
  reason: string;
  products: ProductProps[];
}

export interface ProductPropsAdd {
  id: string;
  name: string;
  genre: string;
  color: string;
  size: string;
  status: string;
  createdAt: string;
  obs: string;
  purchase_type: string;
  sale_value: number;
  purchase_value: number;
  brand: string;
  category: string;
  mold: string;
  provider: string;
}
