import {inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  readonly API_URL = 'http://localhost/backend/';
  private token? = localStorage.getItem('token');

  private getHeaders(): HeadersInit {
    if(this.token == undefined || this.token == ''){
      return {
        'Content-Type': 'application/json'
      }
    }
    else {
      return {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    }
  }

  // Metodo para hacer llamadas GET a la API
  async get<T = any>(url: string): Promise<T>{
    try {
      const response = await fetch(`${this.API_URL}${url}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data);
      }
    }
    catch (error) {
      throw error;
    }
  }

  // Metodo para hacer llamadas POST a la API
  async post<T = any>(url: string, body: string): Promise<T>{
    try {
      const response = await fetch(`${this.API_URL}${url}`,{
        method: 'POST',
        headers: this.getHeaders(),
        body: body
      })
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data);
      }
    }
    catch (error) {
      throw error;
    }
  }

  // Metodo para hacer llamadas PUT a la API
  async put<T = any>(url: string, body: string): Promise<T>{
    try {
      const response = await fetch(`${this.API_URL}${url}`,{
        method: 'PUT',
        headers: this.getHeaders(),
        body: body
      })
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data);
      }
    }
    catch (error) {
      throw error;
    }
  }

  // Metodo para hacer llamadas DELETE a la API
  async delete<T = any>(url: string): Promise<T>{
    try {
      const response = await fetch(`${this.API_URL}${url}`,{
        method: 'DELETE',
        headers: this.getHeaders()
      })
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data);
      }
    }
    catch (error) {
      throw error;
    }
  }


  constructor() { }
}
