import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  /* user: any = {}; */

  constructor(public auth: AngularFireAuth) {
    /* this.auth.user.subscribe((usuario) => {
      this.user = usuario;
      console.log(usuario);
    }); */
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.signOut();
  }

}
