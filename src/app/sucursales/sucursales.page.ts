import { Component, OnDestroy, OnInit } from '@angular/core';
import { GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, MarkerOptions, Polyline } from '@ionic-native/google-maps';
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
    private sucService: SucursalesService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.cargarMapa()
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe( () => {
      this.sucService.getAll().forEach(
        sucursal => {
          let markerOptions: MarkerOptions = {
            position: {
              lat: sucursal.coords.lat,
              lng: sucursal.coords.lng
            },
            title: sucursal.nombre
            
          }
  
          this.map.addMarker(markerOptions)
        }
      )
    })

  }

  cargarMapa(){
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
          lng: -101.3479721
        },
        zoom: 5
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
    })
  }

}
