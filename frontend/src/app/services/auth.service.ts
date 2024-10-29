import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token? = localStorage.getItem('token');

  // Metodo para verificar si el usuario esta logueado
  isValidUser(): boolean{
    return !!this.token;
  }
  // Metodo para cerrar sesion
  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Login
  async login(email: string, password: string): Promise<void>{
    console.log("email:", email);
    console.log("password", password);
    // Hacer llamada a la API
    try{
      // Hacer llamada a la API
      const response = await fetch('http://localhost/backend/auth/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      });
      const data = await response.json();
      // Guardar token y setearlo en el local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    catch(error){
      throw error;
    }
  }

  // Obtener token
  getToken(): string{
    return this.token || '';
  }

  // Saber si el usuario es admin
  isAdmin(): boolean{
    const user = localStorage.getItem('user');
    if(user){
      const {role} = JSON.parse(user);
      return role === 'admin';
    }
    return false
  }

  constructor() { }
}
