import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { cart, order, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addProduct(data:product){
    // console.warn("Product service call");
   return this.http.post('http://localhost:3000/products',data);    
  }

  productList(){
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  deleteProduct(id:number){
   return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product:product){
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`,product);
  }

  popularProduct(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=5');
  }

  trendyProduct(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=9');
  }

  searchProduct(query:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }
// get card item from local storage
  localAddToCart(data:product){
    let cartData=[];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data]);
    }
    else{
      cartData=JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
    // this.cartData.emit(cartData);
  }

  removeItemFromCart(productId:number){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
     let items:product[] = JSON.parse(cartData);
     items =items.filter((items:product)=>productId!==items.id);
     localStorage.setItem('localCart',JSON.stringify(items));
     this.cartData.emit(items);
      // console.warn(items);
    }
  }

  addToCart(cartData:cart){
    return this.http.post('http://localhost:3000/cart',cartData);   
  }

  getCartList(userId: number){
    this.http.get<product[]>('http://localhost:3000/cart?userId=' + userId,
    {observe:'response'})
    .subscribe((result)=>{
      // console.warn(result);    
      if (result && result.body) {
        this.cartData.emit(result.body);
      }     
    })
  }

  removeToCart(cartId:number){
   return  this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  currentCart(){
    let userStore =localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
  }

  orderNow(data:order){
   return this.http.post('http://localhost:3000/orders', data); 
  }
}
