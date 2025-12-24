import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-read-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-about-me.html',
  styleUrls: ['./read-about-me.css']
})
export class ReadAboutMe implements AfterViewInit, OnDestroy {
  @ViewChild('header', { static: true }) headerRef!: ElementRef;
  @ViewChild('title', { static: true }) titleRef!: ElementRef;

  private scrollUnlisten: (() => void) | null = null;
  private resizeUnlisten: (() => void) | null = null;
  private lampRaf = 0;
  private lastNightness = 0;
  private nightTimeout: number | null = null;

  // cached geometry
  private headerHeight = 0;
  private initialCenter = { x: 0, y: 0 };
  private finalCenter = { x: 0, y: 0 };
  private titleSize = { w: 0, h: 0 };
  private rightPadding = 10;
  private topPadding = 36;
  private finalScale = 0.16;

  constructor(private renderer: Renderer2) { }

  private computeFinalScale(): number {
    // on mobile, use a larger scale so text stays visible in top-right
    if (window.innerWidth <= 480) {
      return 0.35;
    } else if (window.innerWidth <= 768) {
      return 0.30;
    }
    return 0.16;
  }

  ngAfterViewInit(): void {
    // compute geometry based on current scroll, not assuming top
    this.prepareGeometry();

    // immediately apply the scroll transform for current position
    this.onScroll();

    this.scrollUnlisten = this.renderer.listen('window', 'scroll', () => this.onScroll());
    this.resizeUnlisten = this.renderer.listen('window', 'resize', () => this.onResize());
  }


  private onScroll(): void {
    if (!this.headerRef || !this.titleRef) return;

    const headerRect = this.headerRef.nativeElement.getBoundingClientRect();
    const titleEl = this.titleRef.nativeElement as HTMLElement;
    if (titleEl.offsetHeight > window.innerHeight * 0.8) {
      this.renderer.setStyle(titleEl, 'font-size', `${window.innerHeight * 0.08}px`);
    }
    const titleRect = titleEl.getBoundingClientRect();

    // Recalculate finalCenter each scroll to pick up any padding changes
    this.finalCenter.x = window.innerWidth - this.rightPadding - titleRect.width / 2;
    this.finalCenter.y = this.topPadding + titleRect.height / 2;

    const bottom = headerRect.bottom;
    const start = this.headerHeight; // when bottom == headerHeight -> progress 0
    const end = 60; // when bottom == end -> progress 1 (tweakable)
    let progress = (start - bottom) / (start - end);
    progress = Math.max(0, Math.min(1, progress));

    // compute current center
    const curX = this.initialCenter.x + (this.finalCenter.x - this.initialCenter.x) * progress;
    const curY = this.initialCenter.y + (this.finalCenter.y - this.initialCenter.y) * progress;

    const tx = curX - this.initialCenter.x;
    const ty = curY - this.initialCenter.y;
    const scale = 1 - progress * (1 - this.finalScale);

    // Always animate using transform from the centered baseline to the final app-top-right target.
    this.renderer.setStyle(titleEl, 'left', `50%`);
    this.renderer.setStyle(titleEl, 'top', `${this.initialCenter.y}px`);
    this.renderer.setStyle(titleEl, 'transformOrigin', 'center center');

    const transform = `translate(-50%, -50%) translate3d(${tx}px, ${ty}px, 0) scale(${scale}) translateZ(0)`;
    this.renderer.setStyle(titleEl, 'transform', transform);

    if (progress >= 1) {
      titleEl.classList.add('scrolled');
    } else {
      titleEl.classList.remove('scrolled');
    }
  }

  private prepareGeometry(): void {
    const titleEl = this.titleRef.nativeElement as HTMLElement;
    const headerEl = this.headerRef.nativeElement as HTMLElement;

    const titleRect = titleEl.getBoundingClientRect();
    const headerRect = headerEl.getBoundingClientRect();

    this.headerHeight = headerRect.height;
    this.titleSize.w = titleRect.width;
    this.titleSize.h = titleRect.height;

    // compute final scale based on window width
    this.finalScale = this.computeFinalScale();

    // calculate current scroll offset
    const scrollY = window.scrollY || window.pageYOffset;

    // initial center: header center in document coordinates
    this.initialCenter.x = window.innerWidth / 2;
    this.initialCenter.y = headerRect.top + headerRect.height / 2 + scrollY;

    // final center (top-right corner of the screen, below navbar)
    this.finalCenter.x = window.innerWidth - this.rightPadding - titleRect.width / 2;
    this.finalCenter.y = this.topPadding + titleRect.height / 2;

    // position title fixed at initialCenter
    this.renderer.setStyle(titleEl, 'position', 'fixed');
    this.renderer.setStyle(titleEl, 'left', `50%`);
    this.renderer.setStyle(titleEl, 'top', `${this.initialCenter.y - scrollY}px`);
    this.renderer.setStyle(titleEl, 'margin', '0');
    this.renderer.setStyle(titleEl, 'transformOrigin', 'center center');
    this.renderer.setStyle(titleEl, 'transform', 'translate(-50%, -50%) scale(1)');
  }

  private onResize(): void {
    this.prepareGeometry();
    this.onScroll();
  }

  ngOnDestroy(): void {
    if (this.scrollUnlisten) this.scrollUnlisten();
    if (this.resizeUnlisten) this.resizeUnlisten();
  }
}
