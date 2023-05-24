import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
orderData:order[] | undefined;
  constructor(private ps:ProductService){}
  ngOnInit(): void {
    this.getOrderList();  
  }
  getOrderList(){
    this.ps.orderList().subscribe((result)=>{
      this.orderData=result;
    }) 
  }

  cancelOrder(orderId:number | undefined){
    orderId && this.ps.cancelOrder(orderId).subscribe((result)=>{
      this.getOrderList();  
    })
  }

}
