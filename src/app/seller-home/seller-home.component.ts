import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faCoffee, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  productMessage:undefined |string;
  deleteIcon = faTrash;
  editIcon = faEdit;
  constructor(private product:ProductService){}

  ngOnInit(): void {
   this.showProductList();
  }

  showProductList(): void{
    this.product.productList().subscribe((result)=>{
      console.warn(result);
      this.productList=result;
      });
  }

  deleteProduct(id:number){
   console.warn(id);
   this.product.deleteProduct(id).subscribe((result)=>{
  if(result){
   this.productMessage="Product is delete...";
   this.showProductList();
  }
   })
  setTimeout(() => {
    this.productMessage=undefined
  }, 5000);
  }
}
