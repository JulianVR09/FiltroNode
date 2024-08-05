import ProductRepository from "../repositories/productRepository";
import { inject, injectable } from "tsyringe";
import ProductModel from "../models/productModel";
import { ProductType } from "../interfaces/product";

@injectable()
export default class ProductService {
    constructor(@inject('productRepository') private productRepository: ProductRepository){}

        async getAllProducts(): Promise<ProductType[]>{
            return await this.productRepository.findAll();
        }

        async getProductById(id: number): Promise<ProductType | null>{
            return await this.productRepository.findById(id);
        }

        async createProduct(product: Partial<ProductModel>): Promise<ProductType | null>{
            return await this.productRepository.create(product)
        }

        async updateProduct(id: number, product: Partial<ProductModel>): Promise<[affectedCount: number]>{
            return await this.productRepository.update(id, product);
        }

        async deleteProduct(id: number): Promise<number>{
            return await this.productRepository.delete(id);
        }
    
}