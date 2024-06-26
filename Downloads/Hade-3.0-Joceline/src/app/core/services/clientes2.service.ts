import { Injectable } from '@angular/core';
import { Database, ref, set, get, update, remove, push, DatabaseReference } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from '../../clientes/listado-clientes/cliente.model'; // Asegúrate de que la ruta sea correcta
import { query, orderByChild, startAt, endAt } from 'firebase/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class Clientes2Service {
  private dbPath = '/clientes';

  constructor(private db: Database) { }


  getCitasByEmail(email: string): Observable<Cliente[]> {
    const clientesRef = ref(this.db, this.dbPath);
    const emailQuery = query(clientesRef, orderByChild('correo'), startAt(email), endAt(email + '\uf8ff'));
  
    return from(get(emailQuery)).pipe(
      map((snapshot: any) => {
        if (snapshot.exists()) {
          const clientes = snapshot.val();
          return Object.keys(clientes).map(key => ({ id: key, ...clientes[key] }));
        } else {
          return [];
        }
      })
    );
  }

  getFutureCitas(): Observable<Cliente[]> {
    const citasRef = ref(this.db, this.dbPath);
    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const futureQuery = query(citasRef, orderByChild('fechaCompra'), startAt(today));

    return from(get(futureQuery)).pipe(
      map((snapshot: any) => {
        if (snapshot.exists()) {
          const citas = snapshot.val();
          return Object.keys(citas).map(key => ({ id: key, ...citas[key] }));
        } else {
          return [];
        }
      })
    );
  }

  // Obtener todos los clientes
  getClientes(): Observable<Cliente[]> {
    const clientesRef = ref(this.db, this.dbPath);
    return from(get(clientesRef)).pipe(
      map((snapshot: any) => {
        if (snapshot.exists()) {
          const clientes = snapshot.val();
          return Object.keys(clientes).map(key => ({ id: key, ...clientes[key] }));
        } else {
          return [];
        }
      })
    );
  }

 
  createCliente(cliente: Cliente): Promise<string> {
    console.log('Servicio: Intentando crear cliente', cliente);
    const clientesRef = ref(this.db, this.dbPath);
    
    // Generar un ID único para el cliente
    const newClienteRef = push(clientesRef);
    const newClienteKey = newClienteRef.key;

    if (!newClienteKey) {
      return Promise.reject('No se pudo generar la clave del cliente');
    }

    // Asignar el ID al cliente antes de guardarlo
    cliente.id = newClienteKey;

    // Guardar el cliente con el ID asignado
    return set(newClienteRef, cliente)
      .then(() => {
        console.log('Servicio: Cliente creado con éxito');
        return newClienteKey as string;
      })
      .catch(error => {
        console.error('Servicio: Error al crear cliente', error);
        throw error;
      });
  }
  

  // Actualizar un cliente existente
  updateCliente(id: string, value: Partial<Cliente>): Promise<void> {
    const clienteRef = ref(this.db, `${this.dbPath}/${id}`);
    return update(clienteRef, value);
  }

  // Eliminar un cliente existente
  deleteCliente(id: string): Promise<void> {
    const clienteRef = ref(this.db, `${this.dbPath}/${id}`);
    return remove(clienteRef);
  }

  // Obtener un cliente específico
  getCliente(id: string): Observable<Cliente | null> {
    const clienteRef = ref(this.db, `${this.dbPath}/${id}`);
    return from(get(clienteRef)).pipe(
      map((snapshot: any) => {
        if (snapshot.exists()) {
          return { id, ...snapshot.val() } as Cliente;
        } else {
          return null;
        }
      })
    );
  }
}