import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Libro, LibroService } from '../services/libro.service';

@Component({
  selector: 'app-libro',
  standalone: true,
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LibroComponent implements OnInit {
  libros: Libro[] = [];
  libro: Libro = {
    titulo: '',
    autor: '',
    editorial: '',
    anioPublicacion: undefined, // 🔹 Ahora inicia en undefined en lugar de null o 0
  };

  constructor(private libroService: LibroService) {}

  ngOnInit() {
    this.libroService.getLibros().subscribe((data) => {
      this.libros = data;
    });
  }

  async insertarLibro() {
    if (!this.validarFormulario()) return;
    await this.libroService.addLibro(this.libro);
    this.resetForm();
  }

  async updateLibro() {
    if (!this.libro.id) return;
    if (!this.validarFormulario()) return;
    await this.libroService.updateLibro(this.libro.id, this.libro);
    this.resetForm();
  }

  async deleteLibro() {
    if (!this.libro.id) return;
    await this.libroService.deleteLibro(this.libro.id);
    this.resetForm();
  }

  selectLibro(libro: Libro) {
    this.libro = { ...libro };
  }

  resetForm() {
    this.libro = {
      titulo: '',
      autor: '',
      editorial: '',
      anioPublicacion: undefined, // 🔹 Se reinicia a undefined para que el campo quede vacío
    };
  }

  validarFormulario(): boolean {
    if (
      !this.libro.titulo.trim() ||
      !this.libro.autor.trim() ||
      !this.libro.editorial.trim() ||
      this.libro.anioPublicacion === undefined // 🔹 Verifica que el año no esté vacío
    ) {
      alert('Todos los campos son obligatorios y el año debe ser válido.');
      return false;
    }
    return true;
  }

  trackById(index: number, libro: Libro): string {
    return libro.id!;
  }
}
