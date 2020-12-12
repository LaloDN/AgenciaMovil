import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseArrayClass, Environment, Geocoder, GeocoderRequest, GeocoderResult, GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, Marker, MarkerOptions } from '@ionic-native/google-maps';
import { AlertController } from '@ionic/angular';
import { SucursalesService } from './sucursales.service';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.page.html',
  styleUrls: ['./sucursales.page.scss'],
})
export class SucursalesPage implements OnInit, OnDestroy {

  map: GoogleMap

  constructor(
    private googlemaps: GoogleMaps,
    private sucService: SucursalesService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.cargarMapa()
    //cuando carge el mapa, se agregan los marcadores...
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe( () => {
      this.sucService.getAll().forEach(
        sucursal => {
          let markerOptions: MarkerOptions = {
            title: sucursal.nombre,
            position: {
              lat: sucursal.coords.lat,
              lng: sucursal.coords.lng
            },
            icon: 'blue',
            animation: 'DROP'
          }
          let marker: Marker = this.map.addMarkerSync(markerOptions)
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(()=>{
            this.alertCtrl.create({
              header: sucursal.nombre,
              message: sucursal.direccion[0] +", "+ sucursal.direccion[1]+", "+ sucursal.direccion[2]+", "+ sucursal.direccion[3]+", "+ sucursal.direccion[4]+", "+ sucursal.direccion[5],
              buttons: ['Ok']
            }).then(
              el => el.present()
            )
          })
        }
      )
    })

  }

  cargarMapa(){

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDQT9_ljvvQ8OvwJ3QxGgWghfd5lTkhfnU',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDQT9_ljvvQ8OvwJ3QxGgWghfd5lTkhfnU'
    })

    let opcionesMapa: GoogleMapOptions = {
      mapType: 'MAP_TYPE_TERRAIN',
      controls:
      {
        compass: true,
        myLocationButton: true,
        zoom: true
      },
      camera:
      {
        target:
        {
          lat: 25.6061582,
          lng: -100.3479721
        },
        zoom: 9
      }
    }

    this.map = this.googlemaps.create('map_canvas', opcionesMapa)

  }

  ngOnDestroy(){
    this.map.destroy()
  }

  getClosest(){
    this.map.getMyLocation().then(
      posicion => {
          let pos = {
            lat: posicion.latLng.lat,
            lng: posicion.latLng.lng
          }
          let sucursalCercana = this.sucService.getClosest(pos.lat, pos.lng)
          
          this.map.addPolyline({
            geodesic: true,
            points: [
              {lat: pos.lat, lng: pos.lng},
              {lat: sucursalCercana.coords.lat, lng: sucursalCercana.coords.lng}
            ]
          })
      }
    ).catch(err => {
      this.alertCtrl.create({
        header: 'Error',
        message: 'No se pudo obtener la posicion actual',
        buttons: ['Ok']
      }).then(
        el => {
          el.present()
        }
      )

    })
  }

}
