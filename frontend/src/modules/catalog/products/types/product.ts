import type { EntityDefault } from "../../../../shared/types/api";
import type { Category } from "../../categories/types/category";

export type Product = EntityDefault & {
  categoryId: number | null;
  isActive: boolean;
  name: string;
  price: number;
  taxRate: number;
  sku: string;
  category: Category | null;
};
