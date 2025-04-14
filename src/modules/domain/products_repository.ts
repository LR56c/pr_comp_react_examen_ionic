import type { Products } from "./products"

export abstract class ProductsRepository {
  abstract getAll(): Promise<Products[]>;
  abstract create(task: Products): Promise<boolean>;
  abstract delete(task: Products): Promise<boolean>;
}
