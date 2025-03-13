import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, deleteDoc, doc, updateDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Tarea {
  id?: string;
  descripcion: string;
  prioridad: string;
  completada: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  constructor(private firestore: Firestore) {}

  getTareas(): Observable<Tarea[]> {
    const tareasRef = collection(this.firestore, 'tareas');
    return collectionData(tareasRef, { idField: 'id' }) as Observable<Tarea[]>;
  }

  async addTarea(tarea: Tarea): Promise<void> {
    const tareasRef = collection(this.firestore, 'tareas');
    await addDoc(tareasRef, tarea);
  }

  async updateTarea(id: string, tarea: Partial<Tarea>): Promise<void> {
    const tareaRef = doc(this.firestore, 'tareas', id);
    await updateDoc(tareaRef, tarea);
  }

  async deleteTarea(id: string): Promise<void> {
    const tareaRef = doc(this.firestore, 'tareas', id);
    await deleteDoc(tareaRef);
  }
}
