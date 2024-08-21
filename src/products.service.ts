import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductService{
   
    private products: Product[] = [];

    insertProduct(title:string,description:string,price:number){
        const prodId = Math.floor(Math.random()*70000).toString();
        const newProduct = new Product(prodId,title,description,price);
        this.products.push(newProduct);
        return newProduct;
    }

    getAllProduct(){
        return [...this.products];
    }

    getSingleProduct(productId: string){
        const product = this.findProduct(productId)[0];
      return {...product};
    }

   

    editProduct(prodId:string,title:string,desc:string,price:number){
        const [Product,productIndex] = this.findProduct(prodId);
        const updatedProduct = {...Product};
        if(title){
            updatedProduct.title = title;
        
        };
        if(desc){
            updatedProduct.description = desc;
        };
        if(price){
            updatedProduct.price = price;
        }
        this.products[productIndex] = updatedProduct;
        return updatedProduct;
        
    }
     deleteProduct(prodId:string){
        const index = this.findProduct(prodId)[1];
        this.products.splice(index,1);
     }


    private findProduct(prodId:string):[Product,number]{
        const productIndex = this.products.findIndex(prod => prod.id==prodId);
        const product = this.products.find(prod => prod.id===prodId);
      if(!product){
        throw new NotFoundException ('could not find the product!')
      }
      return [product, productIndex];
    }
}   