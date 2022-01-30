/* import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Clientes {
  id?: string,
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
    const coleccion = collection(firestore, 'clientes');
    this.clientes$ = collectionData(coleccion);
     
    console.log(this.clientes$);    

    this.clientes$.subscribe((resultado)=>{         
      console.log(resultado);
    })
  }

  ngOnInit(): void { }

} */


import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Clientes {
  id?: string,
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
  
  constructor(private db: Firestore) {
    const datos = collection(this.db, 'clientes');
    this.clientes$ = collectionData(datos, { idField: 'id' });
    
    this.clientes$.subscribe((resultado) => {
      console.log(resultado);
      
      resultado.forEach((item) => {
        console.log(item);
      });
    });
  }

  ngOnInit(): void { }
    
}
