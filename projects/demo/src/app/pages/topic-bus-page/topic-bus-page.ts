import { Component } from '@angular/core';
import { CounterProducer } from './components/counter-producer/counter-producer';
import { CounterConsumer } from './components/counter-consumer/counter-consumer';

@Component({
  selector: 'app-topic-bus-page',
  imports: [CounterProducer, CounterConsumer],
  templateUrl: './topic-bus-page.html',
  styleUrl: './topic-bus-page.scss',
})
export class TopicBusPage {}
