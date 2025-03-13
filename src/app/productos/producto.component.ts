import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto, ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  producto: Producto = {
    id: null,
    descripcion: '',
    precio: null,
  };

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  async agregarProducto() {
    if (!this.validarFormulario()) return;
    const idExistente = this.productos.some(p => Number(p.id) === Number(this.producto.id));
    if (idExistente) {
      alert('Ya existe un producto con este ID. Por favor, usa otro ID.');
      return;
    }
  
    await this.productoService.addProducto(this.producto);
    this.resetForm();
  }

  async modificarProducto() {
    if (this.producto.id === null || this.producto.precio === null) {
      alert('ID y Precio no pueden estar vacíos.');
      return;
    }

    this.producto.id = Math.floor(this.producto.id); // Asegurar que sea entero

    if (!Number.isInteger(this.producto.id) || this.producto.id <= 0) {
      alert('El ID debe ser un número entero positivo.');
      return;
    }

    const productoOriginal = this.productos.find(p => Number(p.id) === this.producto.id);

    if (!productoOriginal) {
      alert('El producto no existe en la base de datos. No se puede modificar.');
      return;
    }

    await this.productoService.updateProducto(this.producto.id, this.producto);
    this.resetForm();
  }

  async eliminarProducto(id: number | null) {
    if (id === null) {
      alert('No se puede eliminar un producto sin ID.');
      return;
    }
    await this.productoService.deleteProducto(id);
  }
  

  seleccionarProducto(producto: Producto) {
    this.producto = { ...producto };
  }

  resetForm() {
    this.producto = {
      id: null,
      descripcion: '',
      precio: null, 
    };
  }
  
  

  validarFormulario(): boolean {
    if (
      this.producto.id === null || 
      !Number.isInteger(this.producto.id) || 
      this.producto.id <= 0 ||
      !this.producto.descripcion.trim() ||
      /\d/.test(this.producto.descripcion) || 
      this.producto.precio === null || 
      this.producto.precio <= 0
    ) {
      alert('ID debe ser un número entero positivo. Descripción no puede contener números. Precio debe ser mayor a 0.');
      return false;
    }
    return true;
  }
  

  trackById(index: number, producto: Producto): number {
    return producto.id!;
  }

  convertirIdEntero() {
    if (this.producto.id !== null) {
      this.producto.id = Math.floor(this.producto.id);
    }
  }
  

  validarTexto(event: KeyboardEvent) {
    const char = event.key;
    if (/\d/.test(char)) { 
      event.preventDefault();
    }
  }

  productoEnModificacion(): boolean {
    return this.productos.some(p => Number(p.id) === Number(this.producto.id));
  }

  
}
