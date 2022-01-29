import { Component } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mastergym';
  cargando:boolean = true;

    constructor(public auth: AngularFireAuth) {
    this.auth.user.subscribe((usuario) => {
      setTimeout(()=> {
        console.log(usuario);
        this.cargando = false;
        if(usuario!== null){
          this.cargando = true;
        }
      }, 1000);
    });
  }

  login() {
    this.auth.signInWithEmailAndPassword('correo@correo.com', '123456');
  }
  logout() {
    /* this.cargando = true; */
    this.auth.signOut();
  }
}
