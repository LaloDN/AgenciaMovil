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
      'Virtus', //nombre
      2020, //año
      319700, //precio
      //descripcion
      [ 'Potencia 110 CV / 5,750 revoluciones por minuto',
        'Motor 1.6L 4 cilindros en linea',
        'Dimensiones:',
        '  4.482 mts de Largo',
        '  1.751 mts de Ancho',
        '  1.472 mts de Altura',
        'Peso vehicular: 1,139 kg',
        'Computadora de viaje',
        'Equipo de audio'
      ],
      //imagenes
      ['assets/virtus 1.jpg','assets/virtus 2.jpg','assets/virtus 3.jpg'],
      //video
      'https://www.youtube.com/embed/Ik-SFv95MxY'),
    new Auto(
      2,
      'Polo',
      2020,
      231990,
      [ 'Potencia 105 CV / 5,250 revoluciones por minuto',
        'Motor 1.6L 4 cilindros en linea',
        'Dimensiones:',
        '  3.971 mts de Largo',
        '  1.682 mts de Ancho',
        '  1.469 mts de Altura',
        'Peso vehicular: 1,072 kg',
        'Equipo de audio',
        'Sistema de navegacion'
      ],
      ['assets/polo 1.jpg','assets/polo 2.jpg','assets/polo 3.jpg'],
      'https://www.youtube.com/embed/60NEN2ZM_k8'),
    new Auto(
      3,
      'Vento',
      2020,
      229900,
      [ 'Potencia 105 CV / 5,250 revoluciones por minuto',
        'Motor 1.6L 4 cilindros en linea',
        'Dimensiones:',
        '  4.384 mts de Largo',
        '  1.699 mts de Ancho',
        '  1.467 mts de Altura',
        'Peso vehicular: 1,188 kg',
        'Equipo de audio',
        'Sistema de navegacion'
      ],
      ['assets/vento 1.jpg','assets/vento 2.jpg','assets/vento 3.jpg'],
      'https://www.youtube.com/embed/YK0qFbOVUhE'),
    new Auto(
      4,
      'Golf comfortline',
      2020,
      380890,
      [ 'Potencia 150 CV / 6000 revoluciones por minuto',
        'Motor 1.6L 4 cilindros en linea',
        'Dimensiones:',
        '  4.255 mts de Largo',
        '  2.027 mts de Ancho',
        '  1.452 mts de Altura',
        'Peso vehicular: 1,293 kg',
        'Equipo de audio',
        'Cargador inalambrico para smartphone'
      ],
      ['assets/golf 1.jpg','assets/golf 2.jpg','assets/golf 3.jpg'],
      'https://www.youtube.com/embed/co5O7-j1tt4'),
    new Auto(
      5,
      'Jetta Startline Triptonic',
      2020,
      305990,
      [ 'Potencia 114 CV / 5750 revoluciones por minuto',
        'Motor 1.6L 4 cilindros en linea',
        'Dimensiones:',
        '  4.697 mts de Largo',
        '  2.107 mts de Ancho',
        '  1.459 mts de Altura',
        'Peso vehicular: 1,393 kg',
        'Equipo de audio',
        'Sistema de navegacion'
      ],
      ['assets/jetta 1.jpg','assets/jetta 2.jpg','assets/jetta 3.jpg','assets/jetta 4.jpg','assets/jetta 5.jpg'],
      'https://www.youtube.com/embed/nq3yQCWYWZQ'),
    new Auto(
      6,
      'Saveiro',
      2020,
      353800,
      [ 'Potencia 105 CV / 5250 revoluciones por minuto',
        'Motor 1.6L 4 cilindros en linea',
        'Dimensiones:',
        '  4.493 mts de Largo',
        '  1.708 mts de Ancho',
        '  1.497 mts de Altura',
        'Peso vehicular: 1,039 kg',
        'Computadora de viaje',
        'Equipo de audio',
      ],
      ['assets/saveiro 1.jpg','assets/saveiro 2.jpg','assets/saveiro 3.jpg'],
      'https://www.youtube.com/embed/LwyHAYL5w18'),
    new Auto(
      7,
      'Gol',
      2020,
      205990,
      [ 'Potencia 101 CV / 5100 revoluciones por minuto',
        'Motor 1.6L 4 cilindros en linea',
        'Dimensiones:',
        '  3.897 mts de Largo',
        '  1.656 mts de Ancho',
        '  1.464 mts de Altura',
        'Peso vehicular: 1,035 kg',
        'Computadora de viaje',
        'Equipo de audio',
        'Direccion hidraulica',
        'Frenos ABS'
      ],
      ['assets/gol 1.jpg','assets/gol 2.jpg','assets/gol 3.jpg'],
      'https://www.youtube.com/embed/WMtZzKb9A5E'),
    new Auto(
      8,
      'Golf GTI',
      2020,
      675900,
      [ 'Potencia 230 CV / 5950 revoluciones por minuto',
        'Motor 2L 4 cilindros en linea',
        'Dimensiones:',
        '  4.255 mts de Largo',
        '  1.799 mts de Ancho',
        '  1.452 mts de Altura',
        'Peso vehicular: 970 kg',
        'Computadora de viaje',
        'Equipo de audio',
        'Direccion hidraulica',
        'Frenos ABS'
      ],
      ['assets/golf_gti 1.jpg','assets/golf_gti 2.jpg','assets/golf_gti 3.jpg'],
      'https://www.youtube.com/embed/_Et2TKHjmB0'),
    new Auto(
      9,
      'Jetta GLi',
      2020,
      560900,
      [ 'Potencia 230 CV / 5850 revoluciones por minuto',
        'Motor 2L 4 cilindros en linea',
        'Dimensiones:',
        '  4.702 mts de Largo',
        '  1.799 mts de Ancho',
        '  1.474 mts de Altura',
        'Peso vehicular: 1,476 kg',
        'Computadora de viaje',
        'Equipo de audio',
        'Volkswagen Wire & Wireless App-Connect (control de aplicaciones desde el radio para Smartphone)',
        'Sistema de navegacion',
        'Cargador inalambrico para smartphone'
      ],
      ['assets/jetta_gli 1.jpeg','assets/jetta_gli 2.jpg','assets/jetta_gli 3.jpg'],
      'https://www.youtube.com/embed/Aae-_Q88qW8'),
  ])

  constructor() { }

  get autos(){
    return this._Autos.asObservable()
  }

  getAuto(id: number){
    return this._Autos.value[id]
  }
}
