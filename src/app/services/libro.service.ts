import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Libro {
  id?: string;
  titulo: string;
  autor: string;
  editorial: string;
  anioPublicacion: number | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  constructor(private firestore: Firestore) {}

  getLibros(): Observable<Libro[]> {
    const librosCollection = collection(this.firestore, 'libros');
    return collectionData(librosCollection, { idField: 'id' }) as Observable<Libro[]>;
  }

  async addLibro(libro: Libro): Promise<void> {
    const librosCollection = collection(this.firestore, 'libros');
    const id = doc(librosCollection).id;
    await setDoc(doc(librosCollection, id), libro);
  }

  async updateLibro(id: string, libro: Partial<Libro>): Promise<void> {
    const librosCollection = collection(this.firestore, 'libros');
    await updateDoc(doc(librosCollection, id), libro);
  }

  async deleteLibro(id: string): Promise<void> {
    const librosCollection = collection(this.firestore, 'libros');
    await deleteDoc(doc(librosCollection, id));
  }
}
