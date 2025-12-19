import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef, Renderer2, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-read-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-about-me.html',
  styleUrls: ['./read-about-me.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ReadAboutMe implements AfterViewInit {
  words = ['cats', 'dogs', 'birds'];
  currentIndex = signal(0);

  @ViewChildren('card') cards!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {
    setInterval(() => {
      this.currentIndex.set((this.currentIndex() + 1) % this.words.length);
    }, 2000);
  }

  get currentWord() {
    return this.words[this.currentIndex()];
  }

  ngAfterViewInit() {
    const isHoverSupported = window.matchMedia("(hover: hover)").matches;

    if (!isHoverSupported) return; // skip tilt on touch devices

    this.cards.forEach(cardRef => {
      const cardEl = cardRef.nativeElement;

      this.renderer.listen(cardEl, 'mousemove', (event: MouseEvent) => {
        const rect = cardEl.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 20;
        const rotateY = ((x - centerX) / centerX) * 20;

        this.renderer.setStyle(cardEl, 'transform', `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`);
        this.renderer.setStyle(cardEl, 'box-shadow', `${-rotateY * 3}px ${rotateX * 3}px 40px rgba(0,0,0,0.25)`);
      });

      this.renderer.listen(cardEl, 'mouseleave', () => {
        this.renderer.setStyle(cardEl, 'transform', 'rotateX(0deg) rotateY(0deg)');
        this.renderer.setStyle(cardEl, 'box-shadow', '0 0 20px rgba(0,0,0,0.1)');
      });
    });
  }
}