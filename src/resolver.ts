import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Product } from './model/product';
import { NewProductInput } from './inputs';
import { createEvent } from './services/eventHandler';

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  products(): Promise<Product[]> {
    return Product.find();
  }

  @Mutation(() => String)
  async addProduct(
    @Arg('newProductData') newProductData: NewProductInput
  ): Promise<string> {
    const eventMessage = JSON.stringify(newProductData);
    return await createEvent('product-add', eventMessage);
  }
}
