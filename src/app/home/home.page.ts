import { Component, OnInit } from '@angular/core';
import { Auto } from '../autos/auto.model';
import { AutosService } from '../autos/autos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  autos: Auto[]

  constructor(
    private autosService: AutosService
  ) {}

  ngOnInit(){
    this.autosService.autos.forEach(
      (auto: Auto[]) => {
        this.autos = auto
      }
    )
    console.log(this.autos)
  }

}
