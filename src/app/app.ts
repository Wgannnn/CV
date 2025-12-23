import { Component, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements AfterViewChecked {
  @ViewChild('menu') menu!: ElementRef;

  constructor(public router: Router) {}

  ngAfterViewChecked() {
    this.updateActiveLink();
  }

  updateActiveLink() {
    if (!this.menu) return;
    const links: HTMLElement[] = Array.from(this.menu.nativeElement.querySelectorAll('a'));
    links.forEach(link => {
      const path = link.getAttribute('routerlink');
      if (path === this.router.url) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
