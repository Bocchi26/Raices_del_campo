// navbar.component.ts: Barra de navegacion superior adaptada por rol de usuario
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  usuario = 'Valentina';

  cantidad = 0;

  isLogged = true;

  isAdmin = false;

  logout(){

      console.log("Cerrar sesión");

  }

}