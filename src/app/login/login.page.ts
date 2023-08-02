import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

type  usuario = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: [];
  phone: string;
  website: string;
  company: [];
}


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, private router: Router) { 

    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password':new FormControl("",Validators.required)
  })
  }
  async ingresar(){
    let usuarios:usuario[]
    //console.log("apretó ingresar");
    // se obtienenen f los valores de los campos del formulario
    var f = this.formularioLogin.value;
    const response = await fetch('https://jsonplaceholder.typicode.com/users',{
      method:'GET',
      headers:{
        Accept:'application/json'
      },
    });

    if(!response.ok){
      console.log("no respondio nada");
    }
    console.log(response.body);
    const resultado= (await response.json() as usuario[] );
    let encontrado = resultado.find((listaUsuarios) =>   listaUsuarios.username == f.nombre)
    if(encontrado){
      const alertOK = await this.alertController.create({
        header: '😎¡Bienvenido!',
        message: "¡Hola "+ encontrado.name+"!",
        buttons: ['OK']
      })
      await alertOK.present();
      this.router.navigateByUrl('/tab-inicial/clientes');
    }else{
      const alertNoEncontrado = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      })
      await alertNoEncontrado.present();
    }
  }

  ngOnInit() {
  }

}
