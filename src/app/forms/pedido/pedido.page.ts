import { Component, OnInit, ViewChild } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database'
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Auto } from 'src/app/autos/auto.model';
import { AutosService } from 'src/app/autos/autos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  @ViewChild('formPedido') form: NgForm
  auto: Auto
  total: string
  extras

  constructor(
    private route: ActivatedRoute,
    private autosService: AutosService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private conexion: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        console.log(this.autosService.getAuto(+params["auto_id"]))
        this.auto = this.autosService.getAuto(+params["auto_id"])
        console.log(this.auto)
        
        this.extras = JSON.parse(params["extras"])
        let total = +this.extras['extra'] + this.auto.price
        this.total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
    )
  }

  navigateBack(){
    this.navCtrl.back()
  }

  precio(){
    return this.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  async enviarSolicitud(){

    //expresion regular para validar email
    const regexp = /\S+@\S+\.\S+/ 

    if(!this.form.valid || ! regexp.test(this.form.value['email'])){
      this.alertCtrl.create({
        header: 'Datos invalidos',
        message: 'Los datos ingresados no son validos',
        buttons: ['Ok']
      }).then(
        el => {
          el.present()
        }
      )
      return
    }

    const solicitud = {
      nombre: this.form.value['nombre'],
      email: this.form.value['email'],
      auto: this.auto,
      opcionales: this.extras
    }   

    let loadingEl = await this.loadingCtrl.create({
      message: 'Por favor espera...',
      spinner: 'crescent',
      duration: 1000
    })
    
    let db = this.conexion.database.ref('pedidos')
    loadingEl.present()
    await db.push(solicitud, res => {
      loadingEl.dismiss()
      this.alertCtrl.create({
      header: 'Exito',
      message: 'Solicitud enviada, recibiras un correo con la informacion',
      buttons: [
        {
          text: 'Continuar',
          handler: () => {
            this.navCtrl.navigateRoot('home')
          }
        }
      ]
      }).then(
        el => el.present()
      )
    }).catch(err => {
      this.alertCtrl.create({
        header: 'Error',
        message: 'Hubo un error al procesar tu solicitud, prueba tu conexion a internet y prueba nuevamente',
        buttons: ['Cerrar']
        })
      })

  }

}
