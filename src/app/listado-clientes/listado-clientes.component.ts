import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Clientes {
  nombre: string,
  apellido: string,
  cedula: string,
  correo: string,
  fechaNacimiento: Date,
  imgUrl: string,
  telefono: string
};

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  clientes$: Observable<any[]>;

  constructor(firestore: Firestore) {
    const colleccion = collection(firestore, 'clientes');
    this.clientes$ = collectionData(colleccion);
  }

  ngOnInit(): void {
  }

}
