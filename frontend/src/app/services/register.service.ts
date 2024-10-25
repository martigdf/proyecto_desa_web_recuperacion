import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost/backend/users/users'; 

  // Método de registro
  async register(name: string, lastname: string, email: string, password: string): Promise<void> {
    console.log("Datos de registro:", { name, lastname, email });
    try {
      // Hacer llamada a la API para el registro
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, lastname, email, password })
      });

      if (!response.ok) {
        throw new Error('Error en el registro');
      }

      const data = await response.json();
      console.log('Registro exitoso:', data);
    } catch (error) {
      throw error;
    }
  }
}
