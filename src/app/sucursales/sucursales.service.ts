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
  direccion: string[]

  constructor(
    nombre, lat, lng, direccion
  ){
    this.nombre = nombre
    this.coords = new Coordenadas(lat, lng)
    this.direccion = direccion
  }
  
}

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  _sucursales = new BehaviorSubject([
    new Sucursal("Sucursal FCFM", 25.7255829, -100.3173837, [
      "México", "Nuevo León", "San Nicolas de los Garza", "Ciudad Universitaria", "Avenida Manuel L. Barragan", "CP: N/D"
    ]),
    new Sucursal("Sucursal San Pedro", 25.6630269, -100.4081672,[
      "México", "Nuevo León", "San Pedro Garza García", "Casco Urbano", "Lazaro Garza Ayala", "CP: 66230"
    ]),
    new Sucursal("Sucursal Guadalupe", 25.6754221, -100.2068738,[
      "México", "Nuevo León", "Guadalupe", "Nuevo San Sebastian", "Aaron Sáenz", "CP: 67180"
    ]),
    new Sucursal("Sucursal Country", 25.6389632, -100.2873042,[
      "México", "Nuevo León", "Monterrey", "Sin Nombre de Colonia 42", "Rio Pánuco", "CP: N/D"
    ]),
    new Sucursal("Sucursal Allende", 25.280373, -100.0283287,[
      "México", "Nuevo León", "Ciudad de Allende", "Verdini", "Naranja", "CP: 67350"
    ])
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
