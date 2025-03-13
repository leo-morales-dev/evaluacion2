import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  imports: [CommonModule, RouterModule],
})
export class SidenavComponent {
  isExpanded = false;

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  @HostListener('document:click', ['$event'])
  closeSidenav(event: Event) {
    const clickedInsideSidenav = (event.target as HTMLElement).closest('.sidenav');
    if (!clickedInsideSidenav) {
      this.isExpanded = false;
    }
  }
}
