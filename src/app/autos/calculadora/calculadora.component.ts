import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Auto } from '../auto.model';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss'],
})
export class CalculadoraComponent implements OnInit {

  auto: Auto
  dias_espera: number
  total: number

  info = {
    rines: [
      {
        nombre: 'Rin basico',
        imagen: 'assets/calculadora/rin_basico.png',
        extra: 0,
        dias: 0
      },
      {
        nombre: 'Rin deportivo',
        imagen: 'assets/calculadora/rin_deportivo_1.jpg',
        extra: 2500,
        dias: 5
      },
      {
        nombre: 'Rin deportivo 2',
        imagen: 'assets/calculadora/rin_cromado.png',
        extra: 3000,
        dias: 7
      }
    ],
    color_exterior: [
      {
        nombre: 'blanco',
        extra: 0,
        dias: 0
      },
      {
        nombre: 'rojo',
        extra: 7000,
        dias: 10
      },
      {
        nombre: 'azul',
        extra: 7000,
        dias: 12
      },
      {
        nombre: 'negro',
        extra: 10000,
        dias: 17
      }
    ],
    color_interior: [
      {
        nombre: 'blanco',
        extra: 0,
        dias: 0
      },
      {
        nombre: 'cafe',
        extra: 7000,
        dias: 14
      },
      {
        nombre: 'negro',
        extra: 10000,
        dias: 20
      }
    ],
    transmision: [
      {
        nombre: 'automatica',
        extra: 0,
        dias: 0
      },
      {
        nombre: 'manual',
        extra: 4000,
        dias: 15
      }
    ]
  }

  selected = {
    rin: this.info.rines[0],
    color_exterior: this.info.color_exterior[0],
    color_interior: this.info.color_interior[0],
    transmision: this.info.transmision[0]
  }

  constructor(
    private ModalCtrl: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    this.total = this.auto.price
    this.dias_espera = 2
  }

  changeRin(rin){
    this.total -= this.selected.rin.extra
    this.dias_espera -= this.selected.rin.dias
    this.selected.rin = rin
    this.total += rin.extra
    this.dias_espera += rin.dias
  }

  changeColorExterior(color){
    this.total -= this.selected.color_exterior.extra
    this.dias_espera -= this.selected.color_exterior.dias
    this.selected.color_exterior = color
    this.total += color.extra
    this.dias_espera += color.dias
  }

  changeColorInterior(color){
    this.total -= this.selected.color_interior.extra
    this.dias_espera -= this.selected.color_interior.dias
    this.selected.color_interior = color
    this.total += color.extra
    this.dias_espera += color.dias
  }

  changeTransmision(tipo){
    this.total -= this.selected.transmision.extra
    this.dias_espera -= this.selected.transmision.dias
    this.selected.transmision = tipo
    this.total += tipo.extra
    this.dias_espera += tipo.dias
  }

  closeModal(){
    this.ModalCtrl.dismiss()    
  }

  precio(){
    return this.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  }

  comprar(){

    let extras = {
      rin: this.selected.rin.nombre,
      color_exterior: this.selected.color_exterior.nombre,
      color_interior: this.selected.color_interior.nombre,
      transmision: this.selected.transmision.nombre,
      dias_espera: this.dias_espera,
      extra: this.total - this.auto.price
    }
  

    this.ModalCtrl.dismiss()

    let info: NavigationExtras = {
      queryParams: {
        auto_id: this.auto.id,
        extras: JSON.stringify(extras)
      }
    }

    this.router.navigate(['/pedido'], info)
    // this.router.navigateByUrl('forms/pedido')
  }

}
