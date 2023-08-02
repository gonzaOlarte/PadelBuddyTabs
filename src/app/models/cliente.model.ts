export class Cliente {
    id : number;
    clienteNombre: string;
    clienteApellido: string;
    clienteNacimiento : Date;
    clienteDNI : string;
    clienteDireccion : string;
    clienteDescripcion : string;
    
    constructor(clienteNombre: string, clienteApellido: string, clienteNacimiento: Date, clienteDNI: string,clienteDireccion:string, clienteDescripcion: string){
        this.clienteNombre = clienteNombre;
        this.clienteApellido =clienteApellido;
        this.clienteNacimiento = clienteNacimiento;
        this.clienteDNI = clienteDNI;
        this.clienteDireccion = clienteDireccion;
        this.clienteDescripcion=clienteDescripcion;
        this.id = new Date().getTime();
    }
    
}