import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProduct } from '../interfaces/i-product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css']
})
export class ProductShowComponent implements OnInit {

  productos: IProduct[] = [];
  spinner: boolean = false;
  filterSearch: string = '';
  ProductsService: any;
  title = 'Patinetes eléctricos de última generación para tu movilidad urbana';

  constructor(private productosService : ProductsService,
    private spinnerService: NgxSpinnerService) {}

  /* ngOnInit(): void {
    this.spinnerService.show();
    this.productosService.getEventos().subscribe(
      resp =>{
        this.productos = resp;
      },
      error =>{console.log(error);
      }
    );
    this.spinnerService.hide();
  } */

  ngOnInit(): void {
    this.spinnerService.show();
    this.productosService.getEventos().subscribe(
      resp => {
        this.productos = resp;
        this.spinnerService.hide(); // Ocultar el spinner una vez que se han recibido los datos
      },
      error => {
        console.log(error);
        this.spinnerService.hide(); // Ocultar el spinner en caso de error también
      }
    );
  }

  ordenarStock(enlaceEvento: Event) {
    enlaceEvento.preventDefault();
    this.filterSearch = "";
    this.productos.sort((a,b)=>{
      return a.stock - b.stock;
    })
  }

  ordenarPrecio(enlaceEvento: Event) {
    enlaceEvento.preventDefault();
    this.filterSearch = "";
    this.productos.sort((a,b)=>{
      return a.price - b.price;
    })
  }

}
