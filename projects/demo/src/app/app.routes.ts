import { Routes } from '@angular/router';
import { PageI } from './pages/page-i/page-i';
import { PageII } from './pages/page-ii/page-ii';
import { PageIII } from './pages/page-iii/page-iii';

export const routes: Routes = [
    { path: 'page1', component: PageI },
    { path: 'page2', component: PageII },
    { path: 'page3', component: PageIII },
    { path: '**', redirectTo: 'page1' }
];
