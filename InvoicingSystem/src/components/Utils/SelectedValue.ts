import {Product} from "./Product";

export class SelectedValues {
    product: Product;
    count: number;
    discount: number;
    
    constructor(product: Product,
      count: number,
      discount: number) {
      this.product = product;
      this.count = count;
      this.discount = discount;
    }
  }