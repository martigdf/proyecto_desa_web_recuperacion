import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'https://localhost/backend/users/register'; 

  // Método de registro
  async register(name: string, lastname: string, email: string, password: string): Promise<void> {
    //asigna el rol usuario por defecto
    const role = 'user';
    console.log("Datos de registro:", { name, lastname, email, role });
    // Verificar el contenido de la contraseña
    console.log("Contraseña antes de enviar:", password);
    try {
      // Hacer llamada a la API para el registro
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, lastname, email, password, role })
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error( errorResponse.message ||'Error en el registro');
      }

      const data = await response.json();
      console.log('Registro exitoso:', data);
    } 
    catch (error) {
      throw error;
    }
  }
}
