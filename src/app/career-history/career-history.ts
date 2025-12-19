import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-career-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './career-history.html',
  styleUrls: ['./career-history.css'],
})
export class CareerHistory implements AfterViewInit {

  constructor(private elRef: ElementRef) { }

  ngAfterViewInit() {
    const items = this.elRef.nativeElement.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.3 });

    items.forEach((item: any) => observer.observe(item));
  }
}
