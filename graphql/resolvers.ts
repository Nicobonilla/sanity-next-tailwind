import { Product } from "@/models/product";

export const resolvers = {
  Query: {
    products: async () => await Product.findAll(),
  },
};