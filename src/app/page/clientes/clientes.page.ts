import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/service/clientes.service';
import { PhotoService } from 'src/app/service/photo.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  constructor(
   public alertController : AlertController,
   public toastController: ToastController,
   public clientesService: ClientesService,
   public photoService: PhotoService
  ) { }

  ngOnInit() {
  }

  addPhotoToGallery()
  {
    this.photoService.addNewToGallery()
  }

  async addCliente(){
    let alerta = await this.alertController.create({
      header:"Alta de cliente",
      subHeader:"Complete los campos para finalizar",
      inputs: [
        {
          type: "text",
          name: 'clienteNombre',
          placeholder: "Ingresar nombre"
        },
        {
          type: "text",
          name: "clienteApellido",
          placeholder: 'Ingresar apellido'
        },
        {
          type: "date",
          name: "clienteNacimiento",
          placeholder: 'Fecha nacimiento'
        },
        {
          type: "text",
          name: "clienteDNI",
          placeholder: 'Ingresar DNI sin puntos'
        },

        {
          type: "text",
          name: "clienteDireccion",
          placeholder: 'Ingrese la dirección del cliente'
        },
        {
          type: "textarea",
          name: "clienteDescripcion",
          placeholder: 'Información complementaria'
        }

      ],
      buttons:[
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text:"crear",
          handler:(data:any)=>{

            let clienteNombre =   data.clienteNombre;
            let clienteApellido = data.clienteApellido;
            let clienteNacimiento =   data.clienteNacimiento;
            let clienteDNI =   data.clienteDNI;
            let clienteDireccion =   data.clienteDireccion;
            let clienteDescripcion = data.clienteDescripcion;
            let fueCreado = this.clientesService.crearCliente(
              clienteNombre, clienteApellido, clienteNacimiento,  clienteDNI, clienteDireccion,  clienteDescripcion)
            if(fueCreado){
              this.presentToast("Se ha creado el usuario "+clienteNombre);
            }
            console.log(data)
            
          }
        }
      ]
    })
    alerta.present();
  }

  async presentToast(mensaje: string): Promise<void> {
    let toast = await this.toastController.create(
      {
        message: mensaje,
        duration: 2000
      }
    );
    toast.present();
  }


  borrarCliente(clientesItem : Cliente ){
    this.clientesService.borrarCliente(clientesItem);
  }

  async editarCliente(clientesItem : Cliente){
    console.log("Se apretó editarCliente");
    let alerta = await this.alertController.create({
      header:"Editar de cliente",
      subHeader:"Complete los campos que desea editar.",
      inputs: [
        {
          type: "text",
          name: 'clienteNombre',
          placeholder: "Ingresar nombre",
          value: clientesItem.clienteNombre
        },
        {
          type: "text",
          name: "clienteApellido",
          placeholder: 'Ingresar apellido',
          value: clientesItem.clienteApellido
        },
        {
          type: "date",
          name: "clienteNacimiento",
          placeholder: 'Fecha nacimiento',
          value: clientesItem.clienteNacimiento
        },
        {
          type: "text",
          name: "clienteDNI",
          placeholder: 'Ingresar DNI sin puntos',
          value: clientesItem.clienteDNI
        },

        {
          type: "text",
          name: "clienteDireccion",
          placeholder: 'Ingrese la dirección del cliente',
          value: clientesItem.clienteDireccion
        },
        {
          type: "textarea",
          name: "clienteDescripcion",
          placeholder: 'Información complementaria',
          value: clientesItem.clienteDescripcion
        }

      ],
      buttons:[
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text:"Confirmar",
          handler:(data:any)=>{
          const clienteEditado:Cliente= {
             id : clientesItem.id,
             clienteNombre:  data.clienteNombre,
             clienteApellido: data.clienteApellido,
             clienteNacimiento :   data.clienteNacimiento,
             clienteDNI :   data.clienteDNI,
             clienteDireccion :   data.clienteDireccion,
             clienteDescripcion : data.clienteDescripcion,


          }

/*          handler:(data:any)=>{

            let clienteNombre =   data.clienteNombre;
            let clienteApellido = data.clienteApellido;
            let clienteNacimiento =   data.clienteNacimiento;
            let clienteDNI =   data.clienteDNI;
            let clienteDireccion =   data.clienteDireccion;
            let clienteDescripcion = data.clienteDescripcion;
            let fueCreado = this.clientesService.crearCliente(
              clienteNombre, clienteApellido, clienteNacimiento,  clienteDNI, clienteDireccion,  clienteDescripcion)

            if(fueCreado){
              this.presentToast("Se ha creado el usuario "+clienteNombre);
            }
            console.log(data)
*/            
            this.clientesService.editarCliente(clienteEditado);
            this.presentToast("Se ha EDITADO el usuario "+data.clienteNombre + " " + data.clienteApellido);
          }
        }
      ]
    })
    alerta.present();
  }

}
