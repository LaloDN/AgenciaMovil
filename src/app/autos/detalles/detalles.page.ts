import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides, ModalController, NavController } from '@ionic/angular';
import { Auto } from '../auto.model';
import { AutosService } from '../autos.service';
import { CalculadoraComponent } from '../calculadora/calculadora.component';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  @ViewChild('slides') slides: IonSlides
  auto: Auto
  size: number
  currIndex: number = 0

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private autosService: AutosService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      let id = +paramMap.get('auto')
      this.auto = this.autosService.getAuto(id)
      console.log(this.auto)
    })
  }

  async ionViewDidEnter(){
    this.size = await this.slides.length() - 1
  }

  hasNext(){
    return !(this.size == this.currIndex)
  }

  hasPrev(){
    return this.currIndex > 0
  }

  async changeIndex(){
    this.currIndex = await this.slides.getActiveIndex()
  }

  navigateBack(){
    this.navCtrl.back()
  }

  nextSlide(){
    this.currIndex += 1
    this.slides.slideNext()
  }

  prevSlide(){
    this.currIndex -= 1
    this.slides.slidePrev()
  }

  modalCalculadora(){
    //mostrar el modal donde venga una calculadora
    console.log("precio:",this.auto.price)
    this.modalCtrl.create({
      component: CalculadoraComponent,
      componentProps: {
        auto: this.auto
      }
    }).then(
      modalEl => modalEl.present()
    )
  }

  precio(){
    return this.auto.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}
