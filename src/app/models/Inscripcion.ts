import { DocumentReference } from '@angular/fire/firestore';

export class Inscripcion {
    fecha: Date | undefined;
    fechaFinal: Date | undefined;
    cliente: DocumentReference | undefined;
    precios: DocumentReference | undefined;
    subTotal: number = 0;
    iva: number = 0;
    total: number = 0;

    constructor() {
        this.fecha = this.fecha;
        this.fechaFinal = this.fechaFinal;
        this.cliente = this.cliente;
        this.precios = this.precios;
        this.subTotal = this.subTotal;
        this.iva = this.iva;
        this.total = this.total;
    }
}