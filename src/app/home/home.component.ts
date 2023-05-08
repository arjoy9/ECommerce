import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts:undefined | product[]
  trendyProducts:undefined | product[]

  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private ps:ProductService){}

  ngOnInit(): void {
    this.ps.popularProduct().subscribe((data)=>{
    this.popularProducts=data;
    });
    this.getTrendyProduct();
  }

  getTrendyProduct(){
    this.ps.trendyProduct().subscribe((data)=>{
      this.trendyProducts=data;
    })
  }

}
