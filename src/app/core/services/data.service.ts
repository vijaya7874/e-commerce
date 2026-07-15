import { Injectable, signal, computed } from '@angular/core';
import {
  Product,
  Category,
  Testimonial,
  Perk,
  Stat,
  Milestone,
} from '../models/product.model';

/**
 * All site content. Products and prices match the MR Organics catalogue.
 */
@Injectable({ providedIn: 'root' })
export class DataService {
  readonly products = signal<Product[]>([
    {
      id: 'moringa',
      name: 'Moringa Powder',
      blurb: 'Iron-rich leaf of the miracle tree, dried low and milled fine.',
      price: 199,
      mrp: 199,
      weight: '100g / 200g',
      rating: 4.8,
      reviews: 214,
      badge: 'Bestseller',
      emoji: '🌿',
      tone: '#2E7D32',
    },
    {
      id: 'amla',
      name: 'Amla Powder',
      blurb: 'Pure Indian gooseberry, sun-dried whole. Nothing sweetened.',
      price: 275.54,
      mrp: 599,
      weight: '200g',
      rating: 4.7,
      reviews: 168,
      badge: '54% off',
      emoji: '🟡',
      tone: '#C9A227',
    },
    {
      id: 'abc',
      name: 'ABC Powder',
      blurb: 'Apple, beetroot and carrot. The juice bar, dehydrated.',
      price: 499,
      mrp: 599,
      weight: '200g',
      rating: 4.9,
      reviews: 302,
      badge: 'Loved',
      emoji: '🥕',
      tone: '#D2691E',
    },
    {
      id: 'beetroot',
      name: 'Beetroot Powder',
      blurb: 'Whole roots, skin on, dried until they snap. No colour added.',
      price: 249,
      mrp: 299,
      weight: '200g',
      rating: 4.6,
      reviews: 141,
      badge: 'Pre-workout',
      emoji: '🍠',
      tone: '#9C3D6B',
    },
    {
      id: 'ashwagandha',
      name: 'Ashwagandha Powder',
      blurb: 'Root only — no leaf, no filler. The adaptogen, done properly.',
      price: 259,
      mrp: 349,
      weight: '170g',
      rating: 4.8,
      reviews: 189,
      badge: 'Calm',
      emoji: '🌰',
      tone: '#8D6E4F',
    },
    {
      id: 'chilli',
      name: 'Guntur Chilli Powder',
      blurb: 'The heat this district is known for. Sun-dried, nothing dyed.',
      price: 239,
      mrp: 269,
      weight: '400g',
      rating: 4.7,
      reviews: 96,
      badge: 'Fiery',
      emoji: '🌶️',
      tone: '#C0392B',
    },
  ]);

  readonly categories = signal<Category[]>([
    { name: 'Superfoods', emoji: '🌿', count: 6, tone: '#2E7D32' },
    { name: 'Roots', emoji: '🍠', count: 3, tone: '#9C3D6B' },
    { name: 'Fruits', emoji: '🍎', count: 4, tone: '#C0392B' },
    { name: 'Spices', emoji: '🌶️', count: 5, tone: '#D2691E' },
    { name: 'Wellness', emoji: '💚', count: 3, tone: '#1B5E20' },
    { name: 'Combos', emoji: '🎁', count: 3, tone: '#C9A227' },
  ]);

  readonly perks = signal<Perk[]>([
    { icon: 'leaf', title: '100% Organic', body: 'Single-ingredient powders. Read the label — it names the plant, then stops.' },
    { icon: 'sun', title: 'Farm Fresh', body: 'Bought direct from growers around Guntur. No broker sits in between.' },
    { icon: 'globe', title: 'Sustainable', body: 'Small batches, low waste, and crops that ask little of the soil.' },
    { icon: 'drop', title: 'No Chemicals', body: 'No added colour, no sugar, no preservatives. Nothing we would not eat.' },
    { icon: 'truck', title: 'Fast Delivery', body: 'Sealed the day it is milled and shipped within 24 hours.' },
  ]);

  readonly testimonials = signal<Testimonial[]>([
    { name: 'Ananya Rao', place: 'Hyderabad', stars: 5, initials: 'AR', words: 'The moringa actually tastes green, not dusty. You can tell it was dried gently.' },
    { name: 'Vikram Shetty', place: 'Bengaluru', stars: 5, initials: 'VS', words: 'Amla this sour has to be real. My hair and skin have not looked better in years.' },
    { name: 'Priya Menon', place: 'Chennai', stars: 5, initials: 'PM', words: 'The ABC blend goes into my kids’ milk every morning and nobody complains. A win.' },
    { name: 'Rahul Iyer', place: 'Pune', stars: 4, initials: 'RI', words: 'Beetroot before a run makes a real difference. Stains everything, exactly as promised.' },
    { name: 'Sneha Kulkarni', place: 'Mumbai', stars: 5, initials: 'SK', words: 'Ashwagandha that is root only, not bulked out with leaf. Took three weeks, then calm.' },
  ]);

  readonly stats = signal<Stat[]>([
    { value: 10000, suffix: '+', label: 'Happy customers' },
    { value: 500, suffix: '+', label: 'Organic products' },
    { value: 100, suffix: '+', label: 'Farm partners' },
    { value: 25, suffix: '+', label: 'Awards won' },
  ]);

  readonly milestones = signal<Milestone[]>([
    { year: 'Our Journey', title: 'From farming roots', body: 'MR Organics was born from the soil of India, where farming is a way of life, not a job.' },
    { year: 'Our Farmers', title: 'Neighbours, not suppliers', body: 'We buy small from growers we can call by name, and pay them what the crop is worth.' },
    { year: 'Our Promise', title: 'Nothing added', body: 'If a jar looks less full than the one beside it, that is because we filled it with nothing else.' },
  ]);

  readonly bestsellers = computed(() => this.products());
}
