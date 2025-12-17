import { Component, signal } from '@angular/core';
import { Introduction } from './introduction/introduction';
import { ReadAboutMe } from './read-about-me/read-about-me';
import { CareerHistory } from './career-history/career-history';
import { Contact } from './contact/contact';
import { Skills } from './skills/skills';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Introduction, ReadAboutMe, CareerHistory, Skills, Contact],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  menuOpen = false;
  currentPage = signal<'home' | 'about' | 'career' | 'skills' | 'contact'>('home');

  navigate(page: 'home' | 'about' | 'career' | 'skills' | 'contact') {
    this.currentPage.set(page);
    this.menuOpen = false;
  }
}
