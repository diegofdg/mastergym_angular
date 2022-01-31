import { DocumentReference } from '@angular/fire/firestore';

export class Cliente{
    id:string = '';
    nombre: string = '';
    apellido: string = '';
    correo: string = '';
    fechaNacimiento: Date | undefined;
    imgUrl: string = '';
    telefono: number = 0;
    cedula: string = '';
    ref: DocumentReference | undefined;
    visible: boolean = false;
    constructor() { }
}