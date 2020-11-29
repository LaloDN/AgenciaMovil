import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Auto } from 'src/app/autos/auto.model';
import { AutosService } from 'src/app/autos/autos.service';

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
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.auto = this.autosService.getAuto(+params["auto_id"])
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

  onSubmit(){
    console.log(this.auto)
  }

  async enviarSolicitud(){
    //expresion regular para validar email
    const regexp = /\S+@\S+\.\S+/ 

    if(!this.form.valid || ! regexp.test(this.form.value['email'])){
      this.alertCtrl.create({
        header: 'Datos invalidos',
        message: 'Los datos ingresados no son validos',
        buttons: ['Ok'],
        cssClass: 'alert'
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


    const loadingEl = await this.loadingCtrl.create({
      message: 'Por favor espera...',
      spinner: 'crescent',
      duration: 1000
    })

    loadingEl.present().then(
      _ => 
      { 
        loadingEl.dismiss()
        this.alertCtrl.create({
        header: 'Exito',
        message: 'Solicitud enviada',
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
      } 
    )
    
  }

  buscarSucursal(){

  }

}
