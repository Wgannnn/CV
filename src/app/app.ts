import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements AfterViewChecked, OnInit {
  @ViewChild('menu') menu!: ElementRef;

  constructor(
    public router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.setupCursorTracking();
  }

  ngAfterViewChecked(): void {
    this.updateActiveLink();
  }

  private updateActiveLink(): void {
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

  private setupCursorTracking(): void {
    // Create custom cursor element
    const cursorEl = document.createElement('div');
    cursorEl.className = 'custom-cursor';
    cursorEl.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <line x1="16" y1="2" x2="16" y2="10" stroke="white" stroke-width="1.5"/>
        <line x1="16" y1="22" x2="16" y2="30" stroke="white" stroke-width="1.5"/>
        <line x1="2" y1="16" x2="10" y2="16" stroke="white" stroke-width="1.5"/>
        <line x1="22" y1="16" x2="30" y2="16" stroke="white" stroke-width="1.5"/>
        <circle cx="16" cy="16" r="2" fill="white"/>
      </svg>
    `;
    document.body.appendChild(cursorEl);

    // Follow mouse movement
    document.addEventListener('mousemove', (event: MouseEvent) => {
      cursorEl.style.left = (event.clientX - 16) + 'px';
      cursorEl.style.top = (event.clientY - 16) + 'px';
    });

    // Track interactive elements for spinning cursor
    this.renderer.listen('document', 'mouseover', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (this.isInteractive(target)) {
        cursorEl.classList.add('spinning');
      }
    });

    this.renderer.listen('document', 'mouseout', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!this.isInteractive(target)) {
        cursorEl.classList.remove('spinning');
      }
    });


    // Hide cursor when leaving the window
    document.addEventListener('mouseleave', () => {
      cursorEl.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursorEl.style.opacity = '1';
    });
  }

  private isInteractive(el: HTMLElement): boolean {
    return !!el.closest(
      'a, button, input, textarea, select, [role="button"], [tabindex]'
    ) || window.getComputedStyle(el).cursor === 'pointer';
  }
}
