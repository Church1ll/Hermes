import { Routes } from '@angular/router';
import { PageI } from './pages/page-i/page-i';
import { PageII } from './pages/page-ii/page-ii';

export const routes: Routes = [
    { path: 'page1', component: PageI },
    { path: 'page2', component: PageII },
    { path: '**', redirectTo: 'page1' }
];
