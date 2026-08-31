import type { EntityDefault } from "../../../../shared/types/api";
import type { Product } from "../../products/types/product";

export type Category = EntityDefault & {
  name: string;
  products?: Product[]
}