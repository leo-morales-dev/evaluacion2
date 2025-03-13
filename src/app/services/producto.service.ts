import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Producto {
  id: number | null;
  descripcion: string;
  precio: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private firestore: Firestore) {}

  getProductos(): Observable<Producto[]> {
    const productosCollection = collection(this.firestore, 'productos');
    return collectionData(productosCollection, { idField: 'id' }) as Observable<Producto[]>;
  }

  async addProducto(producto: Producto): Promise<void> {
    if (producto.id === null || producto.precio === null) {
      throw new Error('ID y Precio no pueden ser null');
    }
    const productosCollection = collection(this.firestore, 'productos');
    const productoDoc = doc(productosCollection, producto.id.toString());
    await setDoc(productoDoc, producto);
  }

  async updateProducto(id: number | null, producto: Partial<Producto>): Promise<void> {
    if (id === null) {
      throw new Error('El ID no puede ser null');
    }
    const productosCollection = collection(this.firestore, 'productos');
    const productoDoc = doc(productosCollection, id.toString());
    await updateDoc(productoDoc, producto);
  }

  async deleteProducto(id: number | null): Promise<void> {
    if (id === null) {
      throw new Error('El ID no puede ser null');
    }
    const productosCollection = collection(this.firestore, 'productos');
    const productoDoc = doc(productosCollection, id.toString());
    await deleteDoc(productoDoc);
  }
}
