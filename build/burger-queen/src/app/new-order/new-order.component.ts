import { Component, OnInit, Input } from '@angular/core';
import {DataService} from '../data.service';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
})
export class NewOrderComponent implements OnInit {
  show: boolean = false;
  items: any[];
  subTotalComp:number;
  totalComp : number;
  orders: any[];
  

  constructor(private dataService: DataService, private firebaseService: FirestoreService) {
    this.dataService.currentOrder.subscribe(ele => {      
      this.items = ele;
    })

    this.dataService.currentSubTotalNumber.subscribe(ele => {   
      this.subTotalComp = ele;
    })

    this.dataService.currentTotalNumber.subscribe(ele => {
      this.totalComp = ele;
    })

    this.dataService.currentDelete.subscribe(ele => { 
      this.items = ele;
    })
  }
  increase(item){
    this.dataService.quantityNumberAdd(item);
    }
  
    decrease(item){
      this.dataService.quantityNumberRemove(item);
      }
    
    getSubTotal(item){
     this.dataService.obtainSubTotal(item);
     return this.subTotalComp;
    }

    getTotal(items){
      this.dataService.obtainTotal(items);
     return this.totalComp;
    }
    delete(item){
      this.dataService.deleteItem(item);
      }
    sendOrder(){
      this.dataService.sendOrdertoFs();
      }

    orderNumber(){
      this.orders = [];
      this.firebaseService.getOrderNumber().subscribe(ele => {
      ele.forEach((orderData) => {
        this.orders.push({
          id: orderData.payload.doc.id,
          data: orderData.payload.doc.data()
        });
      })
      console.log(this.orders)
    });
    }

  ngOnInit() {
  }

}
