import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../data.service";
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-breakfast',
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.css']
})
export class BreakfastComponent implements OnInit {
  menus: any;
  arrayItems: any[] = [];
  burgerName: any;
  burgerType= 'Simple';
  burgerAdit = '';
  burgerPrice = 10;
  burgerPriceAdit = 0;
  toggleBreak: boolean = false;
  toggleDay: boolean = false;
  closeResult: string;
  model = 1;
  valueOne = false;
  valueTwo = false;
  burgerFinalName: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    public firebaseService: FirestoreService,
    private modalService: NgbModal) {
  
    this.dataService.currentOrder.subscribe(ele => {
      this.arrayItems = ele;
    })

    this.dataService.currentDelete.subscribe(ele => {
      this.arrayItems = ele;
    })

  }

  ngOnInit() {
  }

  open(content, name) {
    this.burgerName = name.nombre;
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  showMenu(schedule: string) {
    schedule === 'Desayuno' ? (this.toggleBreak = true, this.toggleDay = false) : (this.toggleDay = true, this.toggleBreak = false)
    this.menus = [];
    this.router.navigate(['breakfast'], { relativeTo: this.route });
    this.firebaseService.getMenu(schedule).subscribe(ele => {
      ele.forEach((menuData) => {
        this.menus.push({
          id: menuData.payload.doc.id,
          data: menuData.payload.doc.data()
        });
      })
    });
  }

  getOrder(order) {
    const finalBurgerName = `${this.burgerName} ${this.burgerType} ${this.burgerAdit}`;
    const finalPrice = this.burgerPrice + this.burgerPriceAdit;
    const firstLettAdit = this.burgerAdit.charAt(2);
    this.dataService.agregarProd(order, finalBurgerName, finalPrice, firstLettAdit);
    this.getInitialValues();
    
  }
  getInitialValues(){
    this.model= 1;
    this.burgerPriceAdit = 0;
    this.burgerPrice = 10;
    this.burgerAdit = '';
    this.burgerType = 'Simple';
    this.valueOne = false;
    this.valueTwo = false; 
  }

  changeContent(abc) {
    this.burgerType = abc.nombre;
    this.burgerPrice = abc.precio;
  }
  addAdit(aditional, value) {
    value === false ?
      (this.burgerPriceAdit += aditional.precio, this.burgerAdit += `+ ${aditional.nombre}`) :
      (this.burgerPriceAdit -= aditional.precio, this.burgerAdit = this.burgerAdit.replace(`+ ${aditional.nombre}`, ''));
  }
}
