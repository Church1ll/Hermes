import { Routes } from '@angular/router';
import { CrossTabPage } from './pages/cross-tab-page/cross-tab-page';
import { HomePage } from './pages/home-page/home-page';
import { LifecyclePage } from './pages/lifecycle-page/lifecycle-page';
import { MetricsPage } from './pages/metrics-page/metrics-page';
import { ReplayPage } from './pages/replay-page/replay-page';
import { TopicBusPage } from './pages/topic-bus-page/topic-bus-page';
import { WildcardsPage } from './pages/wildcards-page/wildcards-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'topic-bus', component: TopicBusPage },
  { path: 'wildcards', component: WildcardsPage },
  { path: 'replay', component: ReplayPage },
  { path: 'lifecycle', component: LifecyclePage },
  { path: 'cross-tab', component: CrossTabPage },
  { path: 'metrics', component: MetricsPage },
  { path: '**', redirectTo: '' },
];
