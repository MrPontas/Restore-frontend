import { ProductProps } from './props';

export default function sortObjectArrayByName(
  obj: ProductProps[]
): ProductProps[] {
  return obj.sort((a, b) => {
    return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
  });
}
