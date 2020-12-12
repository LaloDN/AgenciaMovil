import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-cambio-coche',
  templateUrl: './cambio-coche.page.html',
  styleUrls: ['./cambio-coche.page.scss'],
})
export class CambioCochePage implements OnInit {
  
  //Aquí guardaremos nuestro formulario, sera de tipo FormGroup
  formularioForm:FormGroup;
  //Y aquí hacemos la imagen
  imagen:string;

  //Utilizaremos el ngONInit como un método que nos devuelva un formulario que creemos
  ngOnInit() {
    this.formularioForm = new FormGroup({
      nombre: new FormControl('',[Validators.required,Validators.minLength(2)]),
      apellidos: new FormControl('',[Validators.required,Validators.minLength(5)]),
      genero: new FormControl('',Validators.required),
      correo: new FormControl('',[Validators.required,Validators.pattern('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$')]),
      telefono: new FormControl('',[Validators.required,Validators.minLength(10)]),
      ciudad: new FormControl('',[Validators.required,Validators.minLength(5)]),
      calle: new FormControl('',[Validators.required,Validators.minLength(5)]),
      colonia: new FormControl('',[Validators.required,Validators.minLength(5)]),
      nointerno: new FormControl(''),
      noexterno: new FormControl('',[Validators.required,Validators.minLength(3)]),
      pais: new FormControl('',[Validators.required,Validators.minLength(4)]),
      modelo: new FormControl('',[Validators.required,Validators.minLength(5)]),
      version: new FormControl('',[Validators.required,Validators.minLength(5)]),
      color: new FormControl('',[Validators.required,Validators.minLength(3)]),
      kilometraje: new FormControl('',[Validators.required,Validators.minLength(2)]),
      precio: new FormControl('',[Validators.required,Validators.minLength(5)]),
      mensaje: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(500)]),
     // foto: new FormControl('',Validators.required),
    });
  }

    //Esto lo ocupamos para el *ngIF, obtenemos su valor y si es válido o no
    get nombre(){return this.formularioForm.get('nombre');}
    get apellidos(){return this.formularioForm.get('apellidos');}
    get genero(){return this.formularioForm.get('genero');}
    get correo(){return this.formularioForm.get('correo');}
    get telefono(){return this.formularioForm.get('telefono');}
    get ciudad(){return this.formularioForm.get('ciudad');}
    get calle(){return this.formularioForm.get('calle');}
    get colonia(){return this.formularioForm.get('colonia');}
    get nointerno(){return this.formularioForm.get('nointerno');}
    get noexterno(){return this.formularioForm.get('noexterno');}
    get pais(){return this.formularioForm.get('pais')}
    get modelo(){return this.formularioForm.get('modelo');}
    get version(){return this.formularioForm.get('version');}
    get color(){return this.formularioForm.get('color');}
    get kilometraje(){return this.formularioForm.get('kilometraje');}
    get precio(){return this.formularioForm.get('precio');}
    get mensaje(){return this.formularioForm.get('mensaje');}
  //  get foto(){return this.formularioForm.get('foto')}


  //Aquí tambien inyectamos nuestro servicio de conexión para pasarle el formulario que acabamos de llenar
  constructor(
    private alertCtrl: AlertController, // mensaje de alerta de ionic
    private conexion: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private camera:Camera
  ) {
  }

  //Método para poder hacer la foto desde nuestro celular
  hacerFoto(){
    console.log('Se esta llamando al método');
    const options:CameraOptions={
      destinationType:this.camera.DestinationType.DATA_URL
    }
    this.camera.getPicture(options).then((imageData)=>{
      this.imagen='data:image/jpeg;dase64,'+imageData;
    },
      (err)=>{
        console.log(err);
      }
    );
  }

  //Con este método guardaremos el formulario
  async onSaveForm(){

    console.log(this.formularioForm)
    if(!this.formularioForm.valid){
      this.alertCtrl.create({
        header: 'Datos invalidos',
        message: 'Los datos ingresados no son validos...',
        buttons: [
          'Ok'
        ]
      }).then(
        el => el.present()
      )
      return
    }

    
    let loadingEl = await this.loadingCtrl.create({
      message: 'Por favor espera...',
      spinner: 'crescent',
      duration: 1000
    })

    //db es referencia a la base de firebase 'cambioCoche'
    let db = this.conexion.database.ref('cambioCoche')
    //se inserta y al obtener res (respuesta) manda mensaje de exito
    db.push(this.formularioForm, res => {
      loadingEl.dismiss()
      this.alertCtrl.create({
          header: "Exito",
          message: "Solicitud enviada con exito",
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
      }).catch(err => { //si ocurre un error
        this.alertCtrl.create({
          header: 'Error',
          message: 'Hubo un error al procesar tu solicitud, prueba tu conexion a internet y prueba nuevamente',
          buttons: ['Cerrar']
          })
        })
  }

}
