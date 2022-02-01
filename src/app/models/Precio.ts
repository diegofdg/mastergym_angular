import { DocumentReference } from "@angular/fire/firestore";

export class Precio{
    id: string = '';
    nombre: string = '';
    costo: number = 0;
    duracion: number = 0;
    tipoDuracion:number = 0;
    ref: DocumentReference | undefined;

    constructor() { 
        this.id = this.id;
        this.nombre = this.nombre;
        this.costo = this.costo;
        this.duracion = this.duracion;
        this.tipoDuracion = this.tipoDuracion;
        this.ref = this.ref;
    }
}