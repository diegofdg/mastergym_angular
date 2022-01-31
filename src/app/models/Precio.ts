import { DocumentReference } from "@angular/fire/firestore";

export class Precio{
    id: string = '';
    nombre: string = '';
    costo: number = 0;
    duracion: number = 0;
    tipoDuracion:number = 0;
    ref: DocumentReference | undefined;
}