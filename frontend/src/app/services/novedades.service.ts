import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export interface Card {
  id: number;
  slug: string;
  backgroundImage: string;
  title: string;
  description: string;
  location: string;
  date: string;
  locationIcon: string;
  dateIcon: string;
}

export interface NovedadesData {
  carouselSlides: CarouselSlide[];
  sectionTitle: string;
  cards: Card[];
}

@Injectable({ providedIn: 'root' })
export class NovedadesService {
  private readonly storageKey = 'novedades-home';

  constructor(private http: HttpClient) {}

  private async loadFromAssets(): Promise<NovedadesData> {
    const data = await this.http
      .get<NovedadesData>('assets/novedades-home.json')
      .toPromise();
    return data || { carouselSlides: [], sectionTitle: '', cards: [] };
  }

  private saveToStorage(data: NovedadesData) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  private readFromStorage(): NovedadesData | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as NovedadesData;
    } catch {
      return null;
    }
  }

  async getAll(): Promise<NovedadesData> {
    const stored = this.readFromStorage();
    if (stored) return stored;
    const assets = await this.loadFromAssets();
    this.saveToStorage(assets);
    return assets;
  }

  async getCardBySlug(slug: string): Promise<Card | undefined> {
    const data = await this.getAll();
    return data.cards.find(c => c.slug === slug);
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 80);
  }

  async addCard(input: Partial<Card> & { title: string; }): Promise<Card> {
    const data = await this.getAll();
    const cards = data.cards || [];
    const newId = cards.length ? Math.max(...cards.map(c => c.id)) + 1 : 1;
    const slug = input.slug ? input.slug : this.generateSlug(input.title);
    const date = input.date ? input.date : new Date().toLocaleDateString();

    const newCard: Card = {
      id: newId,
      slug,
      backgroundImage: input.backgroundImage || '',
      title: input.title,
      description: input.description || '',
      location: input.location || '',
      date,
      locationIcon: input.locationIcon || '',
      dateIcon: input.dateIcon || ''
    };

    cards.push(newCard);
    data.cards = cards;
    this.saveToStorage(data);
    return newCard;
  }

  async updateCard(updated: Card): Promise<void> {
    const data = await this.getAll();
    const cards = data.cards || [];
    const idx = cards.findIndex(c => c.id === updated.id);
    if (idx !== -1) {
      cards[idx] = { ...cards[idx], ...updated };
      data.cards = cards;
      this.saveToStorage(data);
    } else {
      throw new Error('Card not found');
    }
  }

  async deleteCardById(id: number): Promise<void> {
    const data = await this.getAll();
    const cards = data.cards || [];
    const newCards = cards.filter(c => c.id !== id);
    data.cards = newCards;
    this.saveToStorage(data);
  }

  // Métodos para gestionar slides del carousel
  async addSlide(input: Partial<CarouselSlide>): Promise<CarouselSlide> {
    const data = await this.getAll();
    const slides = data.carouselSlides || [];
    const newId = slides.length ? Math.max(...slides.map(s => s.id)) + 1 : 1;

    const newSlide: CarouselSlide = {
      id: newId,
      image: input.image || '',
      title: input.title || '',
      subtitle: input.subtitle || '',
      buttonText: input.buttonText || '',
      buttonLink: input.buttonLink || ''
    };

    slides.push(newSlide);
    data.carouselSlides = slides;
    this.saveToStorage(data);
    return newSlide;
  }

  async updateSlide(updated: CarouselSlide): Promise<void> {
    const data = await this.getAll();
    const slides = data.carouselSlides || [];
    const idx = slides.findIndex(s => s.id === updated.id);
    if (idx !== -1) {
      slides[idx] = { ...slides[idx], ...updated };
      data.carouselSlides = slides;
      this.saveToStorage(data);
    } else {
      throw new Error('Slide not found');
    }
  }

  async deleteSlideById(id: number): Promise<void> {
    const data = await this.getAll();
    const slides = data.carouselSlides || [];
    const newSlides = slides.filter(s => s.id !== id);
    data.carouselSlides = newSlides;
    this.saveToStorage(data);
  }

  async getAllSlides(): Promise<CarouselSlide[]> {
    const data = await this.getAll();
    return data.carouselSlides || [];
  }

  async getSlideById(id: number): Promise<CarouselSlide | undefined> {
    const data = await this.getAll();
    return data.carouselSlides?.find(s => s.id === id);
  }
}
