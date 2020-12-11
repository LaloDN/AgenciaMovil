import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

class Coordenadas{
  lat: number
  lng: number

  constructor(lat: number, lng: number){
    this.lat = lat
    this.lng = lng
  }
}

class Sucursal{
  nombre: string
  coords: Coordenadas

  constructor(
    nombre, lat, lng
  ){
    this.nombre = nombre
    this.coords = new Coordenadas(lat, lng)
  }
  
}

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  _sucursales = new BehaviorSubject([
    new Sucursal("Sucursal 1", 25.7061582, -100.3479721),
    new Sucursal("Sucursal 2", 27.7061582, -101.3479721)
  ])

  constructor() {  
  }

  getAll(){
    return this._sucursales.value
  }

  getClosest(lat: number, lng: number){

    let sucursal: Sucursal
    let distancia_menor = 9999999
    let distancia = 0

    this._sucursales.value.forEach(pos => {
      distancia = Math.sqrt(
        Math.pow(pos.coords.lat - lat, 2) +
        Math.pow(pos.coords.lng - lng, 2)
        )
      if(distancia < distancia_menor){
        sucursal = pos
        distancia_menor = distancia
      }
    })

    return sucursal

  }

}
