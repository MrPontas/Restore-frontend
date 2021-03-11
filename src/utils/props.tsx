import { Options } from '../components/Select';

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

export interface TableProducts {
  id: string;
  name: string;
  mold: MoldProps;
  category: string;
  genre: string;
  sale_value: string;
  status: string;
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

export const genreOptions = [
  { id: 'F', name: 'Feminino' },
  { id: 'M', name: 'Masculino' },
  { id: 'U', name: 'Unissex' },
];

export const typeOptions = [
  { id: 'C', name: 'Consignado' },
  { id: 'O', name: 'Próprio' },
];

export const sizeOptions: Options[] = [
  { id: 'U', name: 'Único' },
  { id: 'PP', name: 'PP' },
  { id: 'P', name: 'P' },
  { id: 'M', name: 'M' },
  { id: 'G', name: 'G' },
  { id: 'GG', name: 'GG' },
  { id: '33', name: '33' },
  { id: '34', name: '34' },
  { id: '35', name: '35' },
  { id: '36', name: '36' },
  { id: '37', name: '37' },
  { id: '38', name: '38' },
  { id: '39', name: '39' },
  { id: '40', name: '40' },
  { id: '41', name: '41' },
  { id: '42', name: '42' },
  { id: '43', name: '43' },
  { id: '44', name: '44' },
  { id: '45', name: '45' },
  { id: '46', name: '46' },
  { id: '47', name: '47' },
  { id: '48', name: '48' },
  { id: '49', name: '49' },
  { id: '50', name: '50' },
  { id: '51', name: '51' },
  { id: '52', name: '52' },
];

export const registerOptions: Options[] = [
  { id: 'I', name: 'Entrada' },
  { id: 'O', name: 'Saída' },
];
