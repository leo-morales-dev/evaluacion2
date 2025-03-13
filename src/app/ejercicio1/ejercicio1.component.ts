import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TareaService, Tarea } from '../services/tarea.service';

@Component({
  selector: 'app-ejercicio1',
  standalone: true,
  templateUrl: './ejercicio1.component.html',
  styleUrls: ['./ejercicio1.component.css'],
  imports: [CommonModule, FormsModule],
})
export class Ejercicio1Component implements OnInit {
  listaTareas: Tarea[] = [];
  tarea: Tarea = { descripcion: '', prioridad: 'Media', completada: false };
  modoEdicion: boolean = false;
  tareaSeleccionadaId?: string;

  constructor(private tareaService: TareaService) {}

  ngOnInit() {
    this.tareaService.getTareas().subscribe((data) => {
      this.listaTareas = data;
    });
  }

  async agregarTarea() {
    if (!this.tarea.descripcion.trim()) {
      alert('Debe ingresar una descripción');
      return;
    }

    await this.tareaService.addTarea(this.tarea);
    this.tarea = { descripcion: '', prioridad: 'Media', completada: false };
  }

  seleccionarTarea(tarea: Tarea) {
    this.modoEdicion = true;
    this.tarea = { ...tarea };
    this.tareaSeleccionadaId = tarea.id;
  }

  async actualizarTarea() {
    if (!this.tareaSeleccionadaId) return;
    
    await this.tareaService.updateTarea(this.tareaSeleccionadaId, { ...this.tarea });

    this.modoEdicion = false;
    this.tarea = { descripcion: '', prioridad: 'Media', completada: false };
    this.tareaSeleccionadaId = undefined;
  }

  async eliminarTarea(id: string) {
    await this.tareaService.deleteTarea(id);
  }

  async eliminarTodasTareas() {
    if (this.listaTareas.length === 0) {
      alert('No hay tareas agregadas para eliminar.');
      return;
    }
  
    if (confirm('¿Estás seguro de eliminar todas las tareas?')) {
      for (let tarea of this.listaTareas) {
        if (tarea.id) {
          await this.tareaService.deleteTarea(tarea.id);
        }
      }
    }
  }

  async cambiarEstado(index: number) {
    const tarea = this.listaTareas[index];
    if (!tarea.id) return;

    await this.tareaService.updateTarea(tarea.id, { completada: !tarea.completada });
  }

  contarPendientes(): number {
    return this.listaTareas.filter(tarea => !tarea.completada).length;
  }
}
