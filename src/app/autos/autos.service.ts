import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auto } from './auto.model';

@Injectable({
  providedIn: 'root'
})
export class AutosService {

  private _Autos = new BehaviorSubject<Auto[]>([
    new Auto(
      1, //id
      'Nissan Sentra', //nombre
      2020, //año
      125000, //precio
      //descripcion
      [ 'Faros con encendido y apagado automático',
        'Audio con Bluetooth® y reconocimiento de voz',
        '6 bolsas de aire',
        'Pantalla Multi Touch de 8" compatible con Apple CarPlay® & Android Auto®',
        'Cámara de Reversa',
        'Control Crucero'],
      //imagenes
      ['assets/Nissan 1.png','assets/Nissan 2.png','assets/Nissan 3.png'],
      //video
      ''),
    new Auto(
      2,
      'Nissan Sentra 2',
      2021,
      125000,
      [ 'Faros con encendido y apagado automático',
        'Audio con Bluetooth® y reconocimiento de voz',
        '6 bolsas de aire',
        'Pantalla Multi Touch de 8" compatible con Apple CarPlay® & Android Auto®',
        'Cámara de Reversa',
        'Control Crucero'],
      ['assets/Nissan 1.png','assets/Nissan 2.png','assets/Nissan 3.png'],
      ''),
  ])

  constructor() { }

  get autos(){
    return this._Autos.asObservable()
  }

  getAuto(id: number){
    return this._Autos.value[id]
  }

}
