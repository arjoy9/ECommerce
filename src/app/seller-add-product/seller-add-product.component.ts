import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  
  addproductMessage:string|undefined;
  constructor(private productService: ProductService){}

  ngOnInit(): void {
    
  }

  addNewProduct(data:product){   
    this.productService.addProduct(data).subscribe((result)=>{
      console.warn(result);
      if(result){
        this.addproductMessage="New Product Added Successfully..";
      }
      setTimeout(()=>(this.addproductMessage=undefined),3000);
    });
  }
}
