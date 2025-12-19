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
export class ReadAboutMe {}