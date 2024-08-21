import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductController{
    constructor(private readonly productService: ProductService){}

    @Post()
    addProduct(@Body('title') prodTitle:string, @Body('description') prodDesc:string, @Body('price') prodPrice:number) {
       const generatedId =  this.productService.insertProduct(prodTitle,prodDesc,prodPrice);
       return {id: generatedId}
    }

    @Get()
    getAll(){
        return this.productService.getAllProduct();
    }

    @Get(':id')
    getSingle(@Param('id') prodId:string){
        const product = this.productService.getSingleProduct(prodId);
        return {product: product}
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') title:string,
        @Body('description') desc:string,
        @Body('price') price:number
    ){
            this.productService.editProduct(prodId,title,desc,price);
    }

    @Delete(':id')
    deleteProd(
        @Param('id') prodId:string,
    ){
        this.productService.deleteProduct(prodId);
        return null;
    }

}