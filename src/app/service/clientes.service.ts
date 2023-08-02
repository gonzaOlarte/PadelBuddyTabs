import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  public clientes: Cliente[]=[];

  constructor() {
    this.cargarStorage();

   }

  crearCliente(clienteNombre:string, clienteApellido:string, clienteNacimiento: Date,  clienteDNI:string, clienteDireccion:string,  clienteDescripcion:string){
    let objetoCliente= new Cliente(clienteNombre,clienteApellido,clienteNacimiento,clienteDNI,clienteDireccion,clienteDescripcion)
    
       // let objetoCliente ={
    //   id : new Date(),
    //   clienteNombre: clienteNombre,
    //   clienteApellido: clienteApellido,
    //   clienteNacimiento : clienteNacimiento,
    //   clienteDNI : clienteDNI,
    //   clienteDireccion : clienteDireccion,
    //   clienteDescripcion : clienteDescripcion

    // };


    this.clientes.push(objetoCliente);
    this.guardarStorage(); 
    return objetoCliente.id ;
  }
  cargarStorage(){
    const clienteStorage = localStorage.getItem('clientes');
    if(clienteStorage == null){
      return this.clientes = [];
    }
    let ojbClientes: Cliente[] = JSON.parse(clienteStorage);
    this.clientes = ojbClientes
    return true
  
  }
  guardarStorage(){
    let stringClientes: string = JSON.stringify(this.clientes);
    localStorage.setItem('clientes',stringClientes);
  }

  borrarCliente(cliente: Cliente){
    let newClientes: Cliente[] = this.clientes.filter((clienteItem) => clienteItem.id !== cliente.id);
    this.clientes = newClientes;
    this.guardarStorage();
  }
  // ver si se puede pisar toda la variable matchCliente con todo el contenido de cliente (son del mismo tipo).✔
  editarCliente(cliente: Cliente){
    let matchCliente: Cliente | any = this.clientes.find((clienteItem) => clienteItem.id === cliente.id);
    console.log("matchCliente.apellido");
    console.log(matchCliente.apellido);
    if(matchCliente){
      matchCliente.clienteApellido = cliente.clienteApellido
      matchCliente.clienteDNI = cliente.clienteDNI;
      matchCliente.clienteDescripcion = cliente.clienteDescripcion;
      matchCliente.clienteDireccion = cliente.clienteDireccion;
      matchCliente.clienteNacimiento = cliente.clienteNacimiento;
      matchCliente.clienteNombre = cliente.clienteNombre;

      this.guardarStorage();
    }else{
      console.log("no se pudo editar el cliente")
    }
  }

}
