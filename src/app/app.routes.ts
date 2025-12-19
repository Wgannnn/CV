import { Routes } from '@angular/router';
import { Introduction } from './introduction/introduction';
import { ReadAboutMe } from './read-about-me/read-about-me';
import { CareerHistory } from './career-history/career-history';
import { Contact } from './contact/contact';
import { Skills } from './skills/skills';

export const routes: Routes = [
  { path: '', component: Introduction },
  { path: 'about', component: ReadAboutMe },
  { path: 'career', component: CareerHistory },
  { path: 'skills', component: Skills },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' }
];
