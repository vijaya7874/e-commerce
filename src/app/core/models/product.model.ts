export interface Product {
  id: string;
  name: string;
  blurb: string;
  price: number;
  mrp: number;
  weight: string;
  rating: number;
  reviews: number;
  badge: string;
  emoji: string;
  tone: string;
}

export interface Category {
  name: string;
  emoji: string;
  count: number;
  tone: string;
}

export interface Testimonial {
  name: string;
  place: string;
  stars: number;
  words: string;
  initials: string;
}

export interface Perk {
  icon: string;
  title: string;
  body: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Milestone {
  year: string;
  title: string;
  body: string;
}
