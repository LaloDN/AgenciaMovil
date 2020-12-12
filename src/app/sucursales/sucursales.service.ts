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
    new Sucursal("Sucursal FCFM", 25.7255829, -100.3173837),
    new Sucursal("Sucursal San Pedro", 25.6630269, -100.4081672),
    new Sucursal("Sucursal Guadalupe", 25.6754221, -100.2068738),
    new Sucursal("Sucursal Country", 25.6389632, -100.2873042),
    new Sucursal("Sucursal Allende", 25.280373, -100.0283287)
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
