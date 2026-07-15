import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Navbar } from './sections/navbar/navbar';
import { Hero } from './sections/hero/hero';
import { Featured } from './sections/featured/featured';
import { Categories } from './sections/categories/categories';
import { WhyUs } from './sections/why-us/why-us';
import { FarmStory } from './sections/farm-story/farm-story';
import { Testimonials } from './sections/testimonials/testimonials';
import { Stats } from './sections/stats/stats';
import { Newsletter } from './sections/newsletter/newsletter';
import { Footer } from './sections/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    Hero,
    Featured,
    Categories,
    WhyUs,
    FarmStory,
    Testimonials,
    Stats,
    Newsletter,
    Footer,
  ],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
