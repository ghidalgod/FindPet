import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage {

  users = [];

  constructor(
    private dataService : DataService ,
    private alertCtrl : AlertController,
    private authService: AuthService,
    private router: Router,
    ) 
  {
    this.dataService.getUser().subscribe(res =>{
      console.log(res);
      this.users = res;
    })
  }

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl:true});
  }
  openNote(note){
  }

async addUser(){
  const alert = await this.alertCtrl.create({
    header :'Información Adoptante',
    inputs: [
      {
        name : 'nameC',
        placeholder: 'Ingrese Nombre Completo',
        type:'text'
      },
      {
        name : 'rut',
        placeholder: 'Ingrese Rut',
        type:'text'
      },
      {
        name : 'ocupacion',
        placeholder: 'Ingrese Ocupacion',
        type:'text'
      },
      {
        name : 'mascota',
        placeholder: 'Ingrese mascota',
        type:'text'
      }
    ],
    buttons:[
      {
        text : 'Cancelar',
        role : 'cancel'
      },
      {
        text: 'Agregar',
        handler: (res) => {
          this.dataService.addUser({nameC: res.nameC , rut : res.rut , ocupacion : res.ocupacion , mascota : res.mascota })
        }
      }
    ]
  });
  await alert.present();
}


}