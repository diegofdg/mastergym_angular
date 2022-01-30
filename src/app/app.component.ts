import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mastergym';
  user: any = {};
  cargando:boolean = true;

    constructor(public auth: AngularFireAuth) {
    this.auth.user.subscribe((usuario) => {
      setTimeout(()=> {
        this.cargando = false;
        this.user = usuario;
        console.log(this.user);
        if(usuario!== null){
          this.cargando = true;
        }
      }, 2000);
    });
  }

  /* login() {
    this.auth.signInWithEmailAndPassword('correo@correo.com', '123456');
  }
  logout() {
    this.auth.signOut();
  } */
}
