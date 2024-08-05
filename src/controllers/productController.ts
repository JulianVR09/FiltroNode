import ProductService from "../services/productService";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { ProductType } from "../interfaces/product";

export default class ProductController{
    static async getAllProducts(_: Request, res: Response){
        try {
            const productService: ProductService = container.resolve(ProductService);
            const products: ProductType[] = await productService.getAllProducts();
            res.status(200).json({
                status: 200,
                products: products
            });
        } catch (error : any) {
            res.status(500).json({
                status: 500,
                message: error.message
            })
        }
    }

    static async getProductById(req: Request, res: Response){
        try {
            const productService: ProductService = container.resolve(ProductService);
            const id: number = parseInt(req.params.id);
            const product: ProductType | null = await productService.getProductById(id);
            if(!product){
                res.status(404).json({
                    status: 404,
                    message: "Product not found"
                });
            }
            res.status(200).json({
                status: 200,
                product: product
            });
        } catch (error : any) {
            res.status(500).json({
                status: 500,
                message: error.message
            })
        }
    }

    static async createProduct(req: Request, res: Response){
        try {
            const productService: ProductService = container.resolve(ProductService);
            const product: ProductType = req.body;
            const newProduct: ProductType | null = await productService.createProduct(product); 
            if(!newProduct){
                res.status(400).json({
                    status: 400,
                    message: "Invalid product data"
                });
            }
            res.status(201).json({
                status: 201,
                product: newProduct
            });
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: error.message
            })
        }
    }

    static async updateProduct(req: Request, res: Response){
        const productService: ProductService = container.resolve(ProductService);
        const id: number = parseInt(req.params.id);
        const product: Partial<ProductType> = req.body;
        try{
            const [affectedCount]: number[] = await productService.updateProduct(id, product);
            if(affectedCount === 0){
                res.status(404).json({
                    status: 404,
                    message: "Product not found"
                });
            }
            res.status(200).json({
                status: 200,
                message: `${affectedCount} product(s) updated`
            });
        } catch (err: any) {
            res.status(500).json({
                status: 500,
                message: err.message
            });
        }
    }

    static async deleteProduct(req: Request, res: Response){
        const productService: ProductService = container.resolve(ProductService);
        const id: number = parseInt(req.params.id);
        try{
            const deletedCount: number = await productService.deleteProduct(id);
            if(deletedCount === 0){
                res.status(404).json({
                    status: 404,
                    message: "Product not found"
                });
                return;
            }
            res.status(200).json({
                status: 200,
                message: `${deletedCount} product(s) deleted`
            });
        } catch (err: any) {
            res.status(500).json({
                status: 500,
                message: err.message
            });
        }
    }
}