import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  clientes: any[] = new Array<any>();
  
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('clientes').get().subscribe((resultado) => {
      resultado.docs.forEach((dato) => {
        let cliente:any = dato.data();
        cliente.id = dato.id;
        cliente.ref = dato.ref;
        this.clientes.push(cliente);
      });
    });
  }    
}
